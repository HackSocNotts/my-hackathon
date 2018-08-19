import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebaseConfig from '../firebase';
import 'firebase/firestore';
import 'firebase/functions';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.functions();

// React redux firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};


const firebaseEnhancer = reactReduxFirebase(firebase, rrfConfig);
const firestoreEnhancer = reduxFirestore(firebase);

export {
  firebaseEnhancer,
  firebaseReducer,
  firestoreEnhancer,
  firestoreReducer,
};
