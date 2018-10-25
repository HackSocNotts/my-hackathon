import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';

import { UPDATE_GENERAL_SETTINGS, updateGeneralSettingsSuccess, updateGeneralSettingsFailure } from '../actions';

const updateGeneralSettingsEpic = action$ => action$.pipe(
  ofType(UPDATE_GENERAL_SETTINGS),
  switchMap((action) => {
    const db = getFirebase().firestore();
    const document = db.doc('settings/general');
    return document.update(action.payload);
  }),
  map(() => updateGeneralSettingsSuccess()),
  withLatestFrom(action$),
  catchError(([error, action]) => of(updateGeneralSettingsFailure(error, action.payload))),
);

export default updateGeneralSettingsEpic;
