import { https, auth } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
initializeApp();

import { MakeAdmin, RemoveAdmin } from './adminFunctions';
import { HandleSignUp } from './automatic/signup';

export const makeAdmin = https.onCall(MakeAdmin);
export const removeAdmin = https.onCall(RemoveAdmin);
export const handleSignUp = auth.user().onCreate(HandleSignUp);
