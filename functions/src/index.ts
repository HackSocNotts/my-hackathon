import { https, auth } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
initializeApp();

import { MakeAdmin, RemoveAdmin } from './adminFunctions';
import { HandleSignUp } from './automatic/signup';
import { NewsletterSubscribe, NewsletterUnsubscribe } from './newsletter';
import { login as myMlhLoginFunction } from './auth/myMlh';

export const makeAdmin = https.onCall(MakeAdmin);
export const removeAdmin = https.onCall(RemoveAdmin);
export const subscribeToNewsletter = https.onCall(NewsletterSubscribe);
export const unsubscibeFromNewsletter = https.onCall(NewsletterUnsubscribe);
export const handleSignUp = auth.user().onCreate(HandleSignUp);
export const myMlhLogin = https.onCall(myMlhLoginFunction);
