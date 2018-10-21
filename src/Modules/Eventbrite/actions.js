/**
 * Eventbrite Action Types
 */

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

/**
* Eventbrite Action Creators
 */

export const getEvents = () => ({
  type: GET_EVENTS,
});

export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const getEvetnsFailure = error => ({
  type: GET_EVENTS_FAILURE,
  payload: error,
});
