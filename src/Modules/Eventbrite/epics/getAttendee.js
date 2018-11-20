import { collectionData } from 'rxfire/firestore';
import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import {
  map,
  switchMap,
  take,
} from 'rxjs/operators';

import {
  GET_ATTENDEE,
  getAttendeeSuccess,
  getAttendeeFailure,
} from '../actions';

const getAttendeeEpic = (action$, state$) => action$.pipe(
  ofType(GET_ATTENDEE),
  switchMap(() => state$),
  switchMap((state) => {
    const { firebase: { auth: { email } } } = state;
    const db = getFirebase().firestore();
    const query = db.collection('settings/eventbrite/attendees')
      .where('profile.email', '==', email)
      .limit(1);
    return collectionData(query, 'id');
  }),
  map((documents) => {
    if (documents.length > 1) {
      return getAttendeeFailure('More than one ticket');
    }
    if (documents.length < 1) {
      return getAttendeeFailure('No ticket');
    }
    return getAttendeeSuccess(documents[0]);
  }),
  take(1),
);

export default getAttendeeEpic;
