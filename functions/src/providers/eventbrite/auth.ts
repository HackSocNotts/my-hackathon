import { CallableContext } from 'firebase-functions/lib/providers/https';
import { firestore } from 'firebase-admin';
import { config, https } from 'firebase-functions';
import getAll from './getAll';

const rp = require('request-promise-native');

const db = firestore();

const { HttpsError } = https;
const baseUrl = 'https://www.eventbrite.com';

const buildUrl = (data: AuthRequest) => {
  const method = '/oauth/token';

  const url = `${baseUrl}${method}`;
  return url;
};

const buildRequest = (data: AuthRequest) => {
  return {
    code: data.code,
    client_secret: config().eventbrite.secret,
    client_id: config().eventbrite.client,
    grant_type: 'authorization_code'
  };
};

const auth = async (data: AuthRequest, context: CallableContext) => {
  const url = buildUrl(data);
  const body = buildRequest(data);

  const authResponse = JSON.parse(await rp.post(url).form(body));

  const bearerToken = authResponse.access_token;

  const uid = context.auth.uid;

  await db.doc(`users/${uid}`).update({ eventbrite : { token: bearerToken }});

  const events = getAll(
    'https://www.eventbriteapi.com/v3/users/me/events',
    bearerToken,
    'events'
  );

  return events;
}

export default auth;

interface AuthRequest {
  code: string;
}