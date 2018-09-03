/**
 * Some variable are environment based and must be set in the .env file
 * @file configuration file for myHackathon.
 * @author Aaron Osher
 */

/**
 * Firebase configuartion. Values can be retrieved from the firebase console
 * Set in the .env file
 */
const firebase = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

/**
 * react-redux-firebase configurateion
 */
const reduxFirebase = {
  /**
   * Presence keeps a list in firestore of which users are currently online
   * @default undefined
   */
  // presence: 'presence',
  /**
   * sessions keeps a history of presence
   * presence must set to true
   * @default undefined
   */
  // sessions: 'sessions',
  /**
   * User profile location in firestore
   * Do not change this value
   */
  userProfile: 'users',
  /**
   * Firestore must be enabled in the console
   * Do not change this value
   */
  useFirestoreForProfile: true,
};

/**
 * configuration varaibles for myHackathon
 */
const siteVars = {
  /**
   * Name of the hackathon/myHackathon portal e.g. myHackNotts
   * Set in .env file
   * @default myHackathon
   */
  hackathonName: process.env.REACT_APP_NAME,
};

// incomplete, submitted, accepted, rejected, waitlsted, confirmed, declined, expired
const applicationStates = {
  /**
   * Applications are incomplete by default, and will remain as such until submitted
   */
  incomplete: {
    name: 'Incomplete',
    message: "You've not submitted your application yet.",
  },
  /**
   * Submitted is once a user has submitted their application for review,
   * and no action has been taken on it
   */
  submitted: {
    name: 'Submitted',
    message: 'Your application has been submitted and is under review.',
  },
  /**
   * Accepted is the state of an application when it's been accepted to attend,
   * and the user has not confirmed/declined to attend
   */
  accepted: {
    name: 'Accepted',
    message: 'Your application has been accepted.',
  },
  /**
   * Rejected is a final state, this is when a user has not been accepted
   */
  rejected: {
    name: 'Rejected',
    message: "Unfortunatley, you've not been accepted to attend the hackathon.",
  },
  /**
   * Waitlisted is when a user ahs been approved, but there isn't enough
   * space to guarentee them a position yet
   */
  waitlisted: {
    name: 'Waitlested',
    message: "You're application has been accepted, but was recieved too late to guarantee attendance. We'll  let you know if a space frees up.",
  },
  /**
   * Confirmed is when a user says they'll attend after the application has been accepted
   */
  confirmed: {
    name: 'Confirmed',
    message: "You've confirmed your attendace. We can't wait to see you at the Hackathon.",
  },
  /**
   * Declined is a final state when a user withdraws their attendacnce after being accepted
   * or confirming attendance
   */
  declined: {
    name: 'Declined',
    message: "You've withdrawen your application after beeing accepted to the Hackathon",
  },
  /**
   * Expired is a final statewhen a user fails to confirm/decline attendance befor the deadline
   * after being accepted
   */
  expired: {
    name: 'Expired',
    message: "You've failed to confirm your attendance in time after being accepted",
  },
  /**
   * Withdrawen is a final state when the user withdraws their applicaiton before it's
   * been revieweed
   */
  withdrawen: {
    name: 'Withdrawen',
    message: "You've witthdrawen your application from consideration.",
  },
};

const dashboardButtons = {
  continue: 'Continue Application',
  review: 'Review Application',
  withdraw: 'Witdhraw Application',
  accept: 'Confirm Attendance',
  decline: 'Decline Attendence',
  team: 'Manage Team',
};

export {
  firebase,
  reduxFirebase,
  siteVars,
  applicationStates,
  dashboardButtons,
};
