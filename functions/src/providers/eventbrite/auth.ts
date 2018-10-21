import { CallableContext } from 'firebase-functions/lib/providers/https';
import { firestore } from 'firebase-admin';
import { config, https } from 'firebase-functions';
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

const getAll = async (url: string, bearer: string, token: string, items?: any[], continuation?: string) => {
  const response = JSON.parse(await rp
    .get(continuation ? `${url}?continuation=${continuation}` : url)
    .auth(null, null, true, bearer));

  console.log('response', response.pagination);
  
  if (response.pagination.has_more_items && response.pagination.continuation) {
    return getAll(
      url,
      bearer,
      token,
      (items ? [...items, ...response[token]] : response[token]),
      response.pagination.continuation
    );
  } else {
    return items ? [...items, ...response[token]] : response[token];
  }
}

const auth = async (data: AuthRequest, context: CallableContext) => {
  const url = buildUrl(data);
  const body = buildRequest(data);

  const authResponse = JSON.parse(await rp.post(url).form(body));

  console.log('auth response', authResponse);

  const bearerToken = authResponse.access_token;

  console.log('beareToken', bearerToken);

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