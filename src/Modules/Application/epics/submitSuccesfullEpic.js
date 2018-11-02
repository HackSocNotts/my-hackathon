import { ofType } from 'redux-observable';
import {
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { push } from 'connected-react-router';

import { SET_APPLICATION_SUCCESS } from '../actions';

const epic = (action$, state$) => action$.pipe(
  ofType(SET_APPLICATION_SUCCESS),
  withLatestFrom(state$),
  map(() => push('/')),
);

export default epic;
