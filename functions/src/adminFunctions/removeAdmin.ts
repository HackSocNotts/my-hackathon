import { auth, firestore } from 'firebase-admin';
import { assignClaim } from '../utils';

const removeAdmin = async (data, context) => {
  const issuer = await auth().getUser(context.auth.uid);
  const target = await auth().getUser(data.uid);

  if (issuer.uid === target.uid) {
    return {
      error: "Can't remove own admin."
    }
  }

  return firestore().doc(`users/${target.uid}`).update({
    admin: false,
  })
    .then(() => assignClaim(issuer, target, { admin: false }))
    .catch(err => {
      console.error(err);
      return { error: 'Unkown server error' };
    });
};

export default removeAdmin;