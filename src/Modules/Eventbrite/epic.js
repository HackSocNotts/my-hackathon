import { combineEpics } from 'redux-observable';
import getEventEpic from './epics/getEvent';

const eventbriteEpic = combineEpics(
  getEventEpic,
);

export default eventbriteEpic;
