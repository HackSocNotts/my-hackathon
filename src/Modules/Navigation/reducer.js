import initalState from './initialState';
import {
  OPEN_NAVIGATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  RESET_NAVIGATION_ITEMS,
  ADD_NAVIGATION_ITEM,
  REMOVE_NAVIGATION_ITEM,
} from './actions';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case OPEN_NAVIGATION_DRAWER:
      return { ...state, drawer: { open: true } };

    case CLOSE_NAVIGATION_DRAWER:
      return { ...state, drawer: { open: false } };

    case RESET_NAVIGATION_ITEMS:
      return { ...state, items: initalState.items };

    case ADD_NAVIGATION_ITEM:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      };

    case REMOVE_NAVIGATION_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id === action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
