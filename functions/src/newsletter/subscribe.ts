
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { auth, firestore } from 'firebase-admin';
import { config, https } from 'firebase-functions';
import { createHash } from 'crypto';
const mailchimpApi = require('mailchimp-api-v3');

const { HttpsError } = https;

const mailchimp = new mailchimpApi(config().mailchimp.api);
const db = firestore();

const subscribe = async (data: null, context: CallableContext) => {
  try {
    // Get user auth data
    const user = await auth().getUser(context.auth.uid);

    // Check if email verified
    if (!user.emailVerified) {
      throw new HttpsError('failed-precondition', 'User not verified');
    }

    // get user's subscription status in database
    const userDocument = db.doc(`/users/${user.uid}`);
    const dbSubscribed = (await userDocument.get()).data()['subscribed'];

    // get user's subscription status on mailchimp
    const subscriberEmail = user.email.toLowerCase();
    const subscriberId = createHash('md5').update(subscriberEmail).digest('hex');

    const mailchimpSubscribed = await mailchimp.get({
      path: '/lists/{list_id}/members/{subscriber_id}',
      path_params: {
        list_id: config().mailchimp.list,
        subscriber_id: subscriberId,
      },
    })
      .then(response => {
        if (response.status === 'subscribed') {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        if (err.status === 404) {
          return false;
        } else {
          console.error(err);
          throw new  HttpsError('internal', 'Unknown error occured.');
        }
      });

    let discrepancy = false;
    // Check for status discrepency
    if (mailchimpSubscribed !== dbSubscribed) {
      discrepancy = true;
      console.error(`Newsletter subscription status discrepancy for uid(${user.uid}): Mailchimp(${mailchimpSubscribed}) Firestore(${dbSubscribed})`);
    }

    // Check if subscribed
    if (mailchimpSubscribed) {
      if (discrepancy) {
        return userDocument.update({ subscribed: true })
          .catch(err => console.error(err));
      }
      throw new HttpsError('failed-precondition', 'Already subscribed')
    }

    // Subscribe User
    return mailchimp.put({
      path: '/lists/{list_id}/members/{subscriber_id}',
      path_params: {
        list_id: config().mailchimp.list,
        subscriber_id: subscriberId,
      },
      body: {
        email_address: user.email,
        status_if_new: 'subscribed',
        status: 'subscribed',
        merge_fields: {
          FNAME: user.displayName.split(' ')[0],
          LNAME: user.displayName.split(' ')[1],
        },
      }
    })
      .then(() => userDocument.update({ subscribed: true }))
      .then(() => ({ data: 'Subscribed sucesfully'}))
      .catch(err => { 
        console.error(err);
        throw new HttpsError('internal', 'Unkown error occured');
      });

  } catch(err) {
    if (err instanceof(HttpsError)) {
      throw new HttpsError(err.code, err.message);
    }
    console.error(err);
    throw new HttpsError('internal', 'Unkown error occured');
  }
};

export default subscribe;
