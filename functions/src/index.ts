import { https } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
initializeApp();

import { MakeAdmin } from './adminFunctions';

const makeAdmin = https.onCall(MakeAdmin);

export { makeAdmin };
