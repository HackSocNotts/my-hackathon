import { combineEpics } from 'redux-observable';

import eventbriteEpic from '../Modules/Eventbrite/epic';
import settingsEpic from '../Modules/Settings/epic';

const rootEpic = combineEpics(
  eventbriteEpic,
  settingsEpic,
);

export default rootEpic;
