import { auth } from 'firebase-admin';
import { assignClaim } from '../utils';

const makeAdmin = async (data, context) => {
  const issuer = await auth().getUser(context.auth.uid);
  const target = await auth().getUser(data.uid);

  return assignClaim(issuer, target, { admin: true });
};

export default makeAdmin;