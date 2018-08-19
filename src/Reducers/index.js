import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-forms';

const coreReducers = combineReducers({
  forms,
});

export default coreReducers;
