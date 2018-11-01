import { CallableContext } from 'firebase-functions/lib/providers/https';
import { firestore } from 'firebase-admin';
import { config, https } from 'firebase-functions';
import getAll from './getAll';

const rp = require('request-promise-native');

const db = firestore();

const { HttpsError } = https;
const baseUrl = 'https://www.eventbriteapi.com/v3';

const url = () => {
  const method = `/webhooks/`;
  return `${baseUrl}${method}`;
};

const setWebhook = async (eventId: string, bearerToken: string, context: CallableContext) => {
  const webhookUrl = `https://${context.rawRequest.hostname}/eventbriteOrderPlaced`;
  console.log(webhookUrl);
  try {

    const raw_response = await rp.post(url())
      .form({
        endpoint_url: webhookUrl,
        actions: 'order.placed',
        event_id: eventId,
      })
      .auth(null, null, true, bearerToken);

    const response = JSON.parse(raw_response);

    const webhookId = response.id;

    const document = db.doc('/settings/eventbrite');
    const documentData = {
      webhook: webhookId,
    };

    await document.update(documentData);

    return true;
  } catch (err) {
    console.error(err);
    throw new HttpsError('internal', 'Unknown error occured');
  }

};

export default setWebhook;