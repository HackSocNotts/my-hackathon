import { combineEpics } from 'redux-observable';
import getEventEpic from './epics/getEvent';
import getAttendeeEpic from './epics/getAttendee';

const eventbriteEpic = combineEpics(
  getEventEpic,
  getAttendeeEpic,
);

export default eventbriteEpic;
