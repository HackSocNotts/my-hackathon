/**
 * Flash Action Types
 */

export const CREATE_FLASH = 'CREATE_FLASH';
export const SHOW_FLASH = 'SHOW_FLASH';
export const CREATE_AND_SHOW_FLASH = 'CREATE_AND_SHOW_FLASH';

/**
* Flash Action Creators
 */

export function createFlash(type, title, message) {
  return {
    type: CREATE_FLASH,
    payload: {
      type,
      title,
      message,
    },
  };
}

export function showFlash() {
  return {
    type: SHOW_FLASH,
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
