import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

import { UPDATE_APPLICATION, updateApplicationSuccess, updateApplicationFailure } from '../actions';

const updateEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_APPLICATION),
  tap(action => console.log('autosave3', action.payload)),
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
  // tap(() => console.log('autosave4')),
  catchError((error) => {
    console.error(error);
    return of(updateApplicationFailure(error));
  }),
  map((next) => {
    console.log(next);
    if (next !== undefined && !!next.type) {
      return next;
    }
    return updateApplicationSuccess();
  }),
);

export default updateEpic;
