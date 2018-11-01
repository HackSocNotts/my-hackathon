import { ofType } from 'redux-observable';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { AUTOSAVE_APPLICATION, updateApplication } from '../actions';

const autoSaveEpic = (action$, state$) => action$.pipe(
  ofType(AUTOSAVE_APPLICATION),
  debounceTime(2000),
  withLatestFrom(state$),
  map(([, state]) => updateApplication(state.form.application.values)),
);

export default autoSaveEpic;
