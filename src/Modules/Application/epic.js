import { combineEpics } from 'redux-observable';
import getApplicationEpic from './epics/getApplicationEpic';
import updateEpic from './epics/updateEpic';
import autoSaveEpic from './epics/autoSaveEpic';
import setEpic from './epics/setEpic';
import submitEpic from './epics/submitEpic';
import submitSuccesfullEpic from './epics/submitSuccesfullEpic';

const epic = combineEpics(
  getApplicationEpic,
  updateEpic,
  autoSaveEpic,
  setEpic,
  submitEpic,
  submitSuccesfullEpic,
);

export default epic;
