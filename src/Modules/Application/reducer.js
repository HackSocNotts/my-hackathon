import initalState from './initalState';
import {
  GET_APPLICATION,
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAILURE,
  SET_APPLICATION_FAILURE,
  UPDATE_APPLICATION_FAILURE,
  AUTOSAVE_APPLICATION_FAILURE,
} from './actions';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_APPLICATION:
      if (state.isLoaded || state.loading) {
        return state;
      }
      return {
        ...state,
        loading: true,
      };

    case GET_APPLICATION_SUCCESS:
      return {
        ...state,
        application: action.payload,
        status: action.payload.status.toUpperCase(),
        loading: false,
        isLoaded: true,
      };

    case GET_APPLICATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoaded: false,
      };

    case SET_APPLICATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_APPLICATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case AUTOSAVE_APPLICATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
