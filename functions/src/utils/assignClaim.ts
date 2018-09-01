import { auth } from 'firebase-admin';
import { https } from 'firebase-functions';
import logMessage, { LogType } from './log';

const { HttpsError } = https;

const assignClaim = (issuer: auth.UserRecord, target: auth.UserRecord, claim: any) => {
  if (!issuer.customClaims || !issuer.customClaims['admin']) {
    return logMessage(issuer, target, `Attempted to assign: ${JSON.stringify(claim)}`, LogType.ClaimAssignment)
      .then(() => {
        throw new HttpsError('permission-denied', 'Issuer not an admin'); 
      })
      .catch(err => {
        console.error(err);
        throw new HttpsError('permission-denied', 'Issuer not an admin');
      });
  }
  return auth().setCustomUserClaims(target.uid, claim)
    .then(() => logMessage(issuer, target, `Assign: ${JSON.stringify(claim)}`, LogType.ClaimAssignment))
    .then(() => ({ data: { success: true } }))
    .catch(err => {
      console.error(err);
      thorw new HttpsError('internal', 'Unknown error occured');
    });
};

export default assignClaim;