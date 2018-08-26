import { WAIT_FOR_ACTION } from 'redux-wait-for-action';
/**
 * Flash Action Types
 */

export const CREATE_FLASH = 'CREATE_FLASH';
export const SHOW_FLASH = 'SHOW_FLASH';
export const CLEAR_FLASH = 'CLEAR_FLASH';
export const CREATE_AND_SHOW_FLASH = 'CREATE_AND_SHOW_FLASH';

/**
* Flash Action Creators
 */

export function showFlash() {
  return {
    type: SHOW_FLASH,
  };
}

export function createFlash(type, title, message) {
  return (dispatch) => {
    dispatch({
      type: CREATE_FLASH,
      payload: {
        type,
        title,
        message,
      },
      /**
       * @TODO figure out how to prevent this from binding
       * multiple times when flash is created on init
       */
      [WAIT_FOR_ACTION]: '@@router/LOCATION_CHANGE',
    })
      .then(() => dispatch(showFlash()))
      .catch(() => false);
  };
}

export function clearFlash() {
  return {
    type: CLEAR_FLASH,
  };
}

export function createAndShowFlash(type, title, message) {
  return {
    type: CREATE_AND_SHOW_FLASH,
    payload: {
      type,
      title,
      message,
    },
  };
}
