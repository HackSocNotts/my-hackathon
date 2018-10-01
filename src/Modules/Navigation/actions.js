/**
 * Navigation Action Types
 */
export const OPEN_NAVIGATION_DRAWER = 'OPEN_NAVIGATION_DRAWER';
export const CLOSE_NAVIGATION_DRAWER = 'CLOSE_NAVIGATION_DRAWER';

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
