import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-forms';
import { firebaseReducer, firestoreReducer } from './firebase';

const coreReducers = combineReducers({
  forms,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default coreReducers;
