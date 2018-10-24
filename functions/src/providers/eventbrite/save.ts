import { CallableContext } from 'firebase-functions/lib/providers/https';
import { auth, firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import setWebhook from './setWebhook';
import logMessage, { LogType as Log } from '../../utils/log';

const rp = require('request-promise-native');

const db = firestore();

const { HttpsError } = https;
const baseUrl = 'https://www.eventbriteapi.com/v3';

const buildUrl = (id: string) => {

  const method = `/events/${id}`;

  const url = `${baseUrl}${method}`;
  
  return url;
};

const save = async (id: string, context: CallableContext) => {
  try {
    const user: auth.UserRecord = await auth().getUser(context.auth.uid);

    if (!user.customClaims['admin']) {
      await logMessage({ issuer: user, message: 'Attempted to update Eventbrite details', type: Log.General});
    }

    const token = (await db.doc(`/users/${user.uid}`).get())
      .data().eventbrite.token;

    const data = JSON.parse((await rp.get(buildUrl(id))
      .auth(null, null, true, token)));

    const document = db.doc('/settings/eventbrite');
    const documentData = {
      ...data,
      bearerToken: token,
      attendees: [],
    };

    await document.set(documentData);

    await setWebhook(id, token, context);

    return true;
  } catch (err) {
    console.error(err);
    throw new HttpsError('internal', 'Unknown error occured');
  }

};

export default save;
