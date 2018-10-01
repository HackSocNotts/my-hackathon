import initalState from './initialState';
import { OPEN_NAVIGATION_DRAWER, CLOSE_NAVIGATION_DRAWER } from './actions';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case OPEN_NAVIGATION_DRAWER:
      return { ...state, drawer: { open: true } };

    case CLOSE_NAVIGATION_DRAWER:
      return { ...state, drawer: { open: false } };

    default:
      return state;
  }
};

export default reducer;
