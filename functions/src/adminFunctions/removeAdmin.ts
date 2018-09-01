import { auth, firestore, https } from 'firebase-admin';
import { assignClaim } from '../utils';

const { HttpsError } = https;

const removeAdmin = async (data, context) => {
  const issuer = await auth().getUser(context.auth.uid);
  const target = await auth().getUser(data.uid);

  if (issuer.uid === target.uid) {
    throw new HttpsError('aborted', "Can't remove own admin.");
  }

  return firestore().doc(`users/${target.uid}`).update({
    admin: false,
  })
    .then(() => assignClaim(issuer, target, { admin: false }))
    .catch(err => {
      console.error(err);
      throw new HttpsError('internal', 'Unkown server error');
    });
};

export default removeAdmin;