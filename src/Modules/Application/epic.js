import { combineEpics } from 'redux-observable';
import getApplicationEpic from './epics/getApplicationEpic';
import updateEpic from './epics/updateEpic';
import autoSaveEpic from './epics/autoSaveEpic';

const epic = combineEpics(
  getApplicationEpic,
  updateEpic,
  autoSaveEpic,
);

export default epic;
