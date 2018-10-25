/**
 * Eventbrite Action Types
 */

export const GET_EVENTS = '@@eventbrite/GET_EVENTS';
export const GET_EVENTS_SUCCESS = '@@eventbrite/GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = '@@eventbrite/GET_EVENTS_FAILURE';
export const GET_EVENT = '@@eventbrite/GET_EVENT';
export const GET_EVENT_SUCCESS = '@@eventbrite/GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = '@@eventbrite/GET_EVENT_FAILURE';
export const GET_ATTENDEE = '@@eventbrite/GET_ATTENDEE';
export const GET_ATTENDEE_SUCCESS = '@@eventbrite/GET_ATTENDEE_SUCCESS';
export const GET_ATTENDEE_FAILURE = '@@eventbrite/GET_ATTENDEE_FAILURE';

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

export const getEventsFailure = error => ({
  type: GET_EVENTS_FAILURE,
  payload: error,
});

export const getEvent = () => ({
  type: GET_EVENT,
});

export const getEventSuccess = events => ({
  type: GET_EVENT_SUCCESS,
  payload: events,
});

export const getEventFailure = error => ({
  type: GET_EVENT_FAILURE,
  payload: error,
});

export const getAttendee = () => ({
  type: GET_ATTENDEE,
});

export const getAttendeeSuccess = events => ({
  type: GET_ATTENDEE_SUCCESS,
  payload: events,
});

export const getAttendeeFailure = error => ({
  type: GET_ATTENDEE_FAILURE,
  payload: error,
});
