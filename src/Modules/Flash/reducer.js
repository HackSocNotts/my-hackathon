import initalState from './initialState';
import {
  CREATE_FLASH,
  CREATE_AND_SHOW_FLASH,
  SHOW_FLASH,
  CLEAR_FLASH,
} from './actions';

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_FLASH:
      return (() => {
        const { title, message, type } = action.payload;
        return {
          ...state,
          active: false,
          show: true,
          title,
          message,
          type,
        };
      })();

    case SHOW_FLASH:
      return {
        ...state,
        active: true,
      };

    case CREATE_AND_SHOW_FLASH:
      return (() => {
        const { title, message, type } = action.payload;
        return {
          ...state,
          active: true,
          title,
          message,
          type,
        };
      })();

    case CLEAR_FLASH:
      return {
        ...state,
        active: false,
        show: false,
        title: '',
        message: '',
        type: '',
      };

    default:
      return state;
  }
};

export default reducer;
