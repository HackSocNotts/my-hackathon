import { ofType } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { GET_EVENT, GET_EVENT_SUCCESS } from '../actions';

const getEventEpic = action$ => action$.pipe(
  ofType(GET_EVENT),
  mapTo({ type: GET_EVENT_SUCCESS, payload: {} }),
);

export default getEventEpic;
