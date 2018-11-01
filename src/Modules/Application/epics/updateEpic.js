import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {
  map,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';

import { UPDATE_APPLICATION, updateApplicationSuccess, updateApplicationFailure } from '../actions';

const updateEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_APPLICATION),
  withLatestFrom(state$),
  map(([action, state]) => {
    if ((typeof action.payload) === 'object') {
      const path = `applications/${state.firebase.auth.uid}`;
      const db = getFirebase().firestore();
      const document = db.doc(path);
      return document.update(action.payload);
    }
    return updateApplicationFailure('wasn\'t object');
  }),
  catchError(error => of(updateApplicationFailure(error))),
  map((next) => {
    if (next !== undefined && !!next.type) {
      return next;
    }
    return updateApplicationSuccess();
  }),
);

export default updateEpic;
