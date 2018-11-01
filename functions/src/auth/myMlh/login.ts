import { CallableContext } from 'firebase-functions/lib/providers/https';
import { auth, firestore } from 'firebase-admin';
import { config, https } from 'firebase-functions';
const rp = require('request-promise-native');

const db = firestore();

const { HttpsError } = https;
const baseUrl = 'https://my.mlh.io';

const buildUrl = (data: LoginRequest) => {
  const method = '/oauth/token';
  const appId: string = config().my_mlh.app_id;
  const secret: string = config().my_mlh.secret;
  const redirect_uri: string = data.uri;
  const code: string = data.code;

  const url = `${baseUrl}${method}?client_id=${appId}&client_secret=${secret}&code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`;
  return url;
};

const retrieveUser = (token: string) => {
  const method = '/api/v2/user.json';
  const url = `${baseUrl}${method}?access_token=${token}`;
  return rp({ 
    method: 'GET',
    uri: url,
    json: true,
  });
};

const checkIfUserExists = (email: string): Promise<string> => auth().getUserByEmail(email)
  .then(user => user.uid)
  .catch(() => Promise.reject(false));

const updateUser = (uid: string, data: myMlhResponse): Promise<string> => db.doc(`users/${uid}`)
  .update({
    myMlhData: data
  })
  .catch(() => db.doc(`users/${uid}`).set({
    displayName: `${data.first_name} ${data.last_name}`,
    email: data.email,
    admin: false,
    myMlhData: data,
  }))
  .then(() => uid);

const setUpUser = (data: myMlhResponse) => auth().createUser({
  displayName: `${data.first_name} ${data.last_name}`,
  email: data.email,
  emailVerified: true
})
  .then(user => user.uid)
  .then(uid => updateUser(uid, data))
  .then(uid => auth().createCustomToken(uid));

const login = async (data: LoginRequest, context: CallableContext) => {
  const url = buildUrl(data);
  const options = {
    method: 'POST',
    uri: url,
    json: true,
  };

  try {
    const token = (await rp(options)).access_token;
    const res = await retrieveUser(token);
    return checkIfUserExists(res.data.email)
      .then(uid => updateUser(uid, res.data))
      .then(uid => auth().createCustomToken(uid))
      .catch(err => {
        if (err === false) {
          return setUpUser(res.data as myMlhResponse);
        } else {
          return Promise.reject(err);
        }
      });
  } catch (err) {
    console.error(err);
    throw new HttpsError('internal', err);
  }
};

export default login;

interface LoginRequest {
  code: string;
  uri: string;
}

interface myMlhResponse {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  level_of_study: string;
  major: string;
  shirt_size: string;
  dietary_restrictions: string;
  special_needs: string;
  date_of_birth: string;
  school: {
    id: number;
    name: string;
  };
  scoes: string[];
}
