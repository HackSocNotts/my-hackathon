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

export { firebase, reduxFirebase, siteVars };
