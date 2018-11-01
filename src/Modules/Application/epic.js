import { combineEpics } from 'redux-observable';
import getApplicationEpic from './epics/getApplicationEpic';
import updateEpic from './epics/updateEpic';
import autoSaveEpic from './epics/autoSaveEpic';
import setEpic from './epics/setEpic';
import submitEpic from './epics/submitEpic';

const epic = combineEpics(
  getApplicationEpic,
  updateEpic,
  autoSaveEpic,
  setEpic,
  submitEpic,
);

export default epic;
