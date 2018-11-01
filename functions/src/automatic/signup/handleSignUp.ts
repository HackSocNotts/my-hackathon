import { config } from 'firebase-functions';
import { auth, firestore } from 'firebase-admin';

const handleSignUp = (event) => {
  const user = event.data;

  // Intialization setup
  if (user.email === config().superadmin.email) {
    return firestore().doc(`users/${user.uid}`).update({ admin: true })
      .then(() => auth().setCustomUserClaims(user.uid, { admin: true }))
      .catch(err => console.error);
  }

  return firestore().doc(`users/${user.uid}`).update({ admin: false })
    .then(() => auth().setCustomUserClaims(user.uid, { admin: false }))
    .catch(err => console.error);
}

export default handleSignUp;
