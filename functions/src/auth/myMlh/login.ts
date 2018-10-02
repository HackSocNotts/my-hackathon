import { CallableContext } from 'firebase-functions/lib/providers/https';
import { auth } from 'firebase-admin';
import { config, https } from 'firebase-functions';
const rp = require('request-promise-native');

const { HttpsError } = https;
const baseUrl = 'https://my.mlh.io';

const buildUrl = (code: string) => {
  const method = '/oauth/token';
  const appId: string = config().my_mlh.app_id;
  const secret: string = config().my_mlh.secret;
  const redirect_uri: string = 'http://localhost:3000/_auth/mlh';

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

const login = async (data: string, context: CallableContext) => {
  const url = buildUrl(data);
  const options = {
    method: 'POST',
    uri: url,
    json: true,
  };

  try {
    const token = (await rp(options)).access_token;
    const res = await retrieveUser(token);
    return res;
  } catch (err) {
    console.error(err);
    throw new HttpsError('internal', err);
  }
};

export default login;
