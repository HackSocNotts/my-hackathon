import { https } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
initializeApp();

import { MakeAdmin, RemoveAdmin } from './adminFunctions';

const makeAdmin = https.onCall(MakeAdmin);
const removeAdmin = https.onCall(RemoveAdmin);

export { makeAdmin, removeAdmin };
