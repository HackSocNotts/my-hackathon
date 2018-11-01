import { doc } from 'rxfire/firestore';
import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { GET_EVENT, GET_EVENT_SUCCESS, GET_EVENT_FAILURE } from '../actions';

const getEventEpic = action$ => action$.pipe(
  ofType(GET_EVENT),
  switchMap(() => {
    const db = getFirebase().firestore();
    const eventbriteDoc = db.doc('settings/eventbrite');
    return doc(eventbriteDoc);
  }),
  map(document => ({ type: GET_EVENT_SUCCESS, payload: document.data() })),
  catchError(error => of({ type: GET_EVENT_FAILURE, error })),
);

export default getEventEpic;
