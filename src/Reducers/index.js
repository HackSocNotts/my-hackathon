import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { firebaseReducer, firestoreReducer } from './firebase';

const coreReducers = combineReducers({
  form: formReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default coreReducers;
