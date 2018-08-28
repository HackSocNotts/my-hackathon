import { auth, firestore } from 'firebase-admin';
import { assignClaim } from '../utils';

const makeAdmin = async (data, context) => {
  const issuer = await auth().getUser(context.auth.uid);
  const target = await auth().getUser(data.uid);

  return firestore().doc(`users/${target.uid}`).update({
    admin: true,
  })
    .then(() => assignClaim(issuer, target, { admin: true }))
    .catch(err => {
      console.error(err);
      return { error: 'Unkown server error' };
    });
};

export default makeAdmin;