import { CallableContext } from 'firebase-functions/lib/providers/https';
import { auth, firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import logMessage, { LogType as Log } from '../../utils/log';

const db = firestore();

const { HttpsError } = https;
const baseUrl = 'https://www.eventbrite.com';

const save = async (data: any, context: CallableContext) => {
  try {
    const user: auth.UserRecord = await auth().getUser(context.auth.uid);
    const eventId = data;

    if (!data.id || !data.name) {
      logMessage({ issuer: user, message: 'Attempted to update Eventbrite details with invalid event', type: Log.General});
      throw new HttpsError('invalid-argument', 'Invalid Eventbrite Event');
    }

    if (!user.customClaims['admin']) {
      logMessage({ issuer: user, message: 'Attempted to update Eventbrite details', type: Log.General});
    }

    const token = (await db.doc(`users/${user.uid}`).get())
      .data().eventbrite.token;

    await db.doc('settings/eventrbite')
      .update({
        ...data,
        bearerToken: token,
        attendees: [],
      });

    return true;
  } catch (err) {
    console.error(err);
    throw new HttpsError('internal', 'Unknown error occured');
  }

};

export default save;
