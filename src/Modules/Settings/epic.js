import { combineEpics } from 'redux-observable';
import getGeneral from './epics/getGeneralSettings';
import setGeneral from './epics/setGeneralSettings';
import updateGeneral from './epics/updateGeneralSettings';

const settingsEpic = combineEpics(
  getGeneral,
  setGeneral,
  updateGeneral,
);

export default settingsEpic;
