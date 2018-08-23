const firebase = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

const reduxFirebase = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const siteVars = {
  hackathonName: process.env.REACT_APP_NAME,
};

export { firebase, reduxFirebase, siteVars };
