import { combineEpics } from 'redux-observable';

import eventbriteEpic from '../Modules/Eventbrite/epic';

const rootEpic = combineEpics(
  eventbriteEpic,
);

export default rootEpic;
