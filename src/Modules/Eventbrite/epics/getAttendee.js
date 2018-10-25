import { collectionData } from 'rxfire/firestore';
import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of, throwError } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
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
    const query = db.collection('settings/eventbrite/attendees').where('profile.email', '==', email);
    return collectionData(query, 'id');
  }),
  map((documents) => {
    if (documents.length !== 1) {
      return throwError('more than one document');
    }
    return documents[0];
  }),
  take(1),
  map(document => getAttendeeSuccess(document)),
  catchError(error => of(getAttendeeFailure(error.message))),
);

export default getAttendeeEpic;
