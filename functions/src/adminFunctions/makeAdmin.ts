import { auth, firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import { assignClaim } from '../utils';

const { HttpsError } = https;

const makeAdmin = async (data, context) => {
  const issuer = await auth().getUser(context.auth.uid);
  const target = await auth().getUser(data.uid);

  return firestore().doc(`users/${target.uid}`).update({
    admin: true,
  })
    .then(() => assignClaim(issuer, target, { admin: true }))
    .catch(err => {
      console.error(err);
      throw new HttpsError('internal', 'Unkown server error');
    });
};

export default makeAdmin;