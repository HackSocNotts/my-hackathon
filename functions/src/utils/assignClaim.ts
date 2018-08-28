import { auth } from 'firebase-admin';
import logMessage, { LogType } from './log';

const assignClaim = (issuer: auth.UserRecord, target: auth.UserRecord, claim: any) => {
  if (!issuer.customClaims || !issuer.customClaims['admin']) {
    return logMessage(issuer, target, `Attempted to assign: ${JSON.stringify(claim)}`, LogType.ClaimAssignment)
      .then(() => ({ success: false, error: 'Issuer not an admin' }))
      .catch(err => {
        console.error(err);
        return { success: false, error: 'Issuer not an admin' }
      });
  }
  return auth().setCustomUserClaims(target.uid, claim)
    .then(() => logMessage(issuer, target, `Assign: ${JSON.stringify(claim)}`, LogType.ClaimAssignment))
    .then(() => ({ success: true }))
    .catch(err => {
      console.error(err);
      return { success: false, error: 'Unknown Error' };
    });
};

export default assignClaim;