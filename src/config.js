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

  /**
   * Base URL for the myHackathon instance with no trailing slash
   * Set in .env file
   * @default http://localhost:3000
   */
  websiteUrl: process.env.REACT_APP_WEB_URL,

  hackathonDate: '2018-11-24',

  eventbriteUrl: 'https://hacknotts2018.eventbrite.com',
};

/**
 * configuration variables for myMLH
 */
const myMlhVars = {
  /**
   * AppID for myMLH app instance
   * set in .env file
   * @default null
   */
  appId: process.env.REACT_APP_MLH_APP_ID,
};

/**
 * configuration varaibles for eventbrite
 */
const eventbriteVars = {
  /**
   * clientId for eventbrite
   * set in .env file
   * @defualt null
   */
  clientKey: process.env.REACT_APP_EVENTBRITE_CLIENT,
};

// incomplete, submitted, accepted, rejected, waitlsted, confirmed, declined, expired
const applicationStates = {
  /**
   * Applications are incomplete by default, and will remain as such until submitted
   */
  INCOMPLETE: {
    name: 'Unconfirmed',
    message: "You've not submitted your details yet.",
  },
  /**
   * Submitted is once a user has submitted their application for review,
   * and no action has been taken on it
   */
  SUBMITTED: {
    name: 'Confirmed',
    message: 'Your details has been submitted, and your ticket has been confirmed.',
  },
  /**
   * Accepted is the state of an application when it's been accepted to attend,
   * and the user has not confirmed/declined to attend
   */
  ACCEPTED: {
    name: 'Accepted',
    message: 'Your application has been accepted.',
  },
  /**
   * Rejected is a final state, this is when a user has not been accepted
   */
  REJECTED: {
    name: 'Rejected',
    message: "Unfortunatley, you've not been accepted to attend the hackathon.",
  },
  /**
   * Waitlisted is when a user ahs been approved, but there isn't enough
   * space to guarentee them a position yet
   */
  WAITLISTED: {
    name: 'Waitlested',
    message: "You're application has been accepted, but was recieved too late to guarantee attendance. We'll  let you know if a space frees up.",
  },
  /**
   * Confirmed is when a user says they'll attend after the application has been accepted
   */
  CONFIRMED: {
    name: 'Confirmed',
    message: "You've confirmed your attendace. We can't wait to see you at the Hackathon.",
  },
  /**
   * Declined is a final state when a user withdraws their attendacnce after being accepted
   * or confirming attendance
   */
  DECLINED: {
    name: 'Declined',
    message: "You've withdrawen your application after beeing accepted to the Hackathon",
  },
  /**
   * Expired is a final statewhen a user fails to confirm/decline attendance befor the deadline
   * after being accepted
   */
  EXPIRED: {
    name: 'Expired',
    message: "You've failed to confirm your attendance in time after being accepted",
  },
  /**
   * Withdrawen is a final state when the user withdraws their applicaiton before it's
   * been revieweed
   */
  WITHDRAWEN: {
    name: 'Withdrawen',
    message: "You've witthdrawen your application from consideration.",
  },
  /**
   * Not applied is when you use Eventbrite to release tickets and the user hasn't applied
   */
  NOTAPPLIED: {
    name: 'Not Reserved',
    message: 'You\'ve not got a ticket on Eventbrite yet.',
  },
};

const dashboardButtons = {
  continue: 'Finish Details',
  review: 'Review Details',
  withdraw: 'Witdhraw Application',
  accept: 'Confirm Attendance',
  decline: 'Decline Attendence',
  team: 'Manage Team',
};

const navigationPages = {
  /**
   * Dashboard is the main page and summarises a user's application state
   * @default 'Dashboard'
   */
  dashboard: 'Dashboard',

  /**
   * Applicaiton is the page where the user fills in their details
   * @default 'Application'
   */
  applciation: 'Details',

  /**
   * Team is the page where users can find and make teams
   * @default 'Teams'
   */
  teams: 'Teams',

  /**
   * Admin is where all management happens
   * @default 'Admin'
   */
  admin: 'Admin',
};

export {
  firebase,
  reduxFirebase,
  siteVars,
  myMlhVars,
  applicationStates,
  dashboardButtons,
  eventbriteVars,
  navigationPages,
};
