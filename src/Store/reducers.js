import { combineReducers } from 'redux';
import { firebaseReducer as firebase } from 'react-redux-firebase';
import { firestoreReducer as firestore } from 'redux-firestore';
import { reducer as form } from 'redux-form';
import navigation from '../Modules/Navigation';
import flash from '../Modules/Flash';
import eventbrite from '../Modules/Eventbrite';
import settings from '../Modules/Settings';
import application from '../Modules/Application';

const makeRootReducer = asyncReducers => combineReducers({
  // Add sync reducers here
  firebase,
  firestore,
  form,
  navigation,
  flash,
  eventbrite,
  settings,
  application,
  ...asyncReducers,
});

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};
/* eslint-enable */

export default makeRootReducer;
