import initalState from './initialState';
import {
  GET_EVENTS_FAILURE,
  GET_EVENTS_SUCCESS,
  GET_EVENTS,
  GET_EVENT,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
} from './actions';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return state;

    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        error: null,
      };

    case GET_EVENTS_FAILURE:
      return {
        ...state,
        events: [],
        error: action.payload,
      };

    case GET_EVENT:
      return state;

    case GET_EVENT_SUCCESS:
      return {
        ...state,
        event: action.payload,
        error: null,
      };

    case GET_EVENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
