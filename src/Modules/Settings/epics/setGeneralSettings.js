import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { SET_GENERAL_SETTINGS, setGeneralSettingsFailure, setGeneralSettingsSuccess } from '../actions';

const setGeneralSettingsEpic = action$ => action$.pipe(
  ofType(SET_GENERAL_SETTINGS),
  switchMap((action) => {
    const db = getFirebase().firestore();
    const document = db.doc('settings/general');
    return document.set(action.payload);
  }),
  map(() => setGeneralSettingsSuccess()),
  catchError(error => of(setGeneralSettingsFailure(error))),
);

export default setGeneralSettingsEpic;
