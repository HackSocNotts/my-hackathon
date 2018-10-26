import { combineEpics } from 'redux-observable';
import getApplicationEpic from './epics/getApplicationEpic';

const epic = combineEpics(
  getApplicationEpic,
);

export default epic;
