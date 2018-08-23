import { combineReducers } from 'redux';
import { firebaseReducer as firebase } from 'react-redux-firebase';
import { firestoreReducer as firestore } from 'redux-firestore';
import { reducer as form } from 'redux-form';

const makeRootReducer = asyncReducers => combineReducers({
  // Add sync reducers here
  firebase,
  firestore,
  form,
  ...asyncReducers,
});

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};
/* eslint-enable */

export default makeRootReducer;
