/**
 * Eventbrite Action Types
 */

export const GET_EVENTS = '@@eventbrite/GET_EVENTS';
export const GET_EVENTS_SUCCESS = '@@eventbrite/GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = '@@eventbrite/GET_EVENTS_FAILURE';
export const GET_EVENT = '@@eventbrite/GET_EVENT';
export const GET_EVENT_SUCCESS = '@@eventbrite/GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = '@@eventbrite/GET_EVENT_FAILURE';

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
