import { combineEpics } from 'redux-observable';

import eventbriteEpic from '../Modules/Eventbrite/epic';
import settingsEpic from '../Modules/Settings/epic';
import applicationEpic from '../Modules/Application/epic';

const rootEpic = combineEpics(
  eventbriteEpic,
  settingsEpic,
  applicationEpic,
);

export default rootEpic;
