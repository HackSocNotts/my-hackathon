import { ofType } from 'redux-observable';
import { debounceTime, map, withLatestFrom, tap } from 'rxjs/operators';
import { AUTOSAVE_APPLICATION, updateApplication } from '../actions';

const autoSaveEpic = (action$, state$) => action$.pipe(
  ofType(AUTOSAVE_APPLICATION),
  tap(() => console.log('autosave1')),
  debounceTime(2000),
  tap(action => console.log('autosave2', action.payload)),
  withLatestFrom(state$),
  map(([, state]) => updateApplication(state.form.application.values)),
);

export default autoSaveEpic;
