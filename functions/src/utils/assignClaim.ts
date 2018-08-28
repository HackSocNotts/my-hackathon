import { auth } from 'firebase-admin';
import logMessage, { LogType } from './log';

const assignClaim = (issuer: auth.UserRecord, target: auth.UserRecord, claim: any) => {
  if (!issuer.customClaims || !issuer.customClaims['admin']) {
    return logMessage(issuer, target, `Attempted to assign: ${JSON.stringify(claim)}`, LogType.ClaimAssignment)
      .then(() => ({ error: 'Issuer not an admin' }))
      .catch(err => {
        console.error(err);
        return { error: 'Issuer not an admin' }
      });
  }
  return auth().setCustomUserClaims(target.uid, claim)
    .then(() => logMessage(issuer, target, `Assign: ${JSON.stringify(claim)}`, LogType.ClaimAssignment))
    .then(() => ({ data: { success: true } }))
    .catch(err => {
      console.error(err);
      return {  error: 'Unknown Error' };
    });
};

export default assignClaim;