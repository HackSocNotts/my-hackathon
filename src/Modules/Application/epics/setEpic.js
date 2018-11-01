import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {
  map,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';

import { SET_APPLICATION, setApplicationSuccess, setApplicationFailure } from '../actions';

const setEpic = (action$, state$) => action$.pipe(
  ofType(SET_APPLICATION),
  withLatestFrom(state$),
  map(([action, state]) => {
    if ((typeof action.payload) === 'object') {
      const path = `applications/${state.firebase.auth.uid}`;
      const db = getFirebase().firestore();
      const document = db.doc(path);
      return document.set(action.payload);
    }
    return setApplicationFailure('wasn\'t object');
  }),
  catchError(error => of(setApplicationFailure(error))),
  map((next) => {
    if (next !== undefined && !!next.type) {
      return next;
    }
    return setApplicationSuccess();
  }),
);

export default setEpic;
