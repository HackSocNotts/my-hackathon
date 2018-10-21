/**
 * Navigation Action Types
 */
export const OPEN_NAVIGATION_DRAWER = 'OPEN_NAVIGATION_DRAWER';
export const CLOSE_NAVIGATION_DRAWER = 'CLOSE_NAVIGATION_DRAWER';
export const RESET_NAVIGATION_ITEMS = 'RESET_NAVIGATION_ITEMS';
export const ADD_NAVIGATION_ITEM = 'ADD_NAVIGATION_ITEM';
export const REMOVE_NAVIGATION_ITEM = 'REMOVE_NAVIGATION_ITEM';

/**
 * action creators
 */

export function openNavigationDrawer() {
  return {
    type: OPEN_NAVIGATION_DRAWER,
  };
}

export function closeNavigationDrawer() {
  return {
    type: CLOSE_NAVIGATION_DRAWER,
  };
}

export function resetNavigationItems() {
  return {
    type: RESET_NAVIGATION_ITEMS,
  };
}

export function addNavigationItem(item) {
  return {
    type: ADD_NAVIGATION_ITEM,
    payload: item,
  };
}

export function removeNavigationItem(itemId) {
  return {
    type: REMOVE_NAVIGATION_ITEM,
    payload: itemId,
  };
}
