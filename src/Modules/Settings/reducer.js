import initalState from './intialState';
import {
  GET_GENERAL_SETTINGS_SUCCESS,
  GET_GENERAL_SETTINGS_FAILURE,
  SET_GENERAL_SETTINGS_FAILURE,
  UPDATE_GENERAL_SETTINGS_FAILURE,
} from './actions';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_GENERAL_SETTINGS_SUCCESS:
      return {
        ...state,
        general: action.payload,
      };

    case GET_GENERAL_SETTINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case SET_GENERAL_SETTINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_GENERAL_SETTINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
