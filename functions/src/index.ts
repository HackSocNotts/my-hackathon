import { https, auth } from 'firebase-functions';
import { initializeApp, credential, firestore } from 'firebase-admin';

const serviceAccount = require('../serviceAccount.json');

initializeApp({
  credential: credential.cert(serviceAccount),
});

const firestoreSettings = { timestampsInSnapshots: true };
firestore().settings(firestoreSettings);

import { MakeAdmin, RemoveAdmin } from './adminFunctions';
import { HandleSignUp } from './automatic/signup';
import { NewsletterSubscribe, NewsletterUnsubscribe } from './newsletter';
import { login as myMlhLoginFunction } from './auth/myMlh';
import {
  auth as EventbriteAuthFlow,
  save as SaveEvenbriteEvent,
  fetchTickets as FetchEventbriteTickets,
  orderPlaced as EventbriteOrderPlaced,
} from './providers/eventbrite';

export const makeAdmin = https.onCall(MakeAdmin);
export const removeAdmin = https.onCall(RemoveAdmin);
export const subscribeToNewsletter = https.onCall(NewsletterSubscribe);
export const unsubscibeFromNewsletter = https.onCall(NewsletterUnsubscribe);
export const handleSignUp = auth.user().onCreate(HandleSignUp);
export const myMlhLogin = https.onCall(myMlhLoginFunction);
export const authEventbrite = https.onCall(EventbriteAuthFlow);
export const saveEventrbite = https.onCall(SaveEvenbriteEvent);
export const fetchEventbriteTickets = https.onCall(FetchEventbriteTickets);
export const eventbriteOrderPlaced = https.onRequest(EventbriteOrderPlaced);
