import { doc } from 'rxfire/firestore';
import { authState } from 'rxfire/auth';
import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { GET_APPLICATION, getApplicationSuccess, getApplicationFailure } from '../actions';

const getApplicationEpic = action$ => action$.pipe(
  ofType(GET_APPLICATION),
  switchMap(() => authState(getFirebase().auth())),
  switchMap((auth) => {
    const db = getFirebase().firestore();
    const document = db.doc(`applications/${auth.uid}`);
    return doc(document);
  }),
  catchError(error => of(getApplicationFailure(error))),
  map((document) => {
    if (document.exists) {
      return getApplicationSuccess(document.data());
    }
    return getApplicationFailure({ code: 'not-found' });
  }),
);

export default getApplicationEpic;
