import { doc } from 'rxfire/firestore';
import { getFirebase } from 'react-redux-firebase';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { GET_GENERAL_SETTINGS, getGeneralSettingsFailure, getGeneralSettingsSuccess } from '../actions';

const getGeneralSettingsEpic = action$ => action$.pipe(
  ofType(GET_GENERAL_SETTINGS),
  switchMap(() => {
    const db = getFirebase().firestore();
    const document = db.doc('settings/general');
    return doc(document);
  }),
  catchError(error => of(getGeneralSettingsFailure(error))),
  map((document) => {
    if (document.exists) {
      return getGeneralSettingsSuccess(document.data());
    }
    return getGeneralSettingsFailure({ code: 'not-found' });
  }),
);

export default getGeneralSettingsEpic;
