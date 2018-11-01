/**
 * actions
 */

export const GET_GENERAL_SETTINGS = '@@settings/GET_GENERAL_SETTINGS';
export const SET_GENERAL_SETTINGS = '@@settings/SET_GENERAL_SETTINGS';
export const UPDATE_GENERAL_SETTINGS = '@@settings/UPDATE_GENERAL_SETTINGS';
export const GET_GENERAL_SETTINGS_SUCCESS = '@@settings/GET_GENERAL_SETTINGS_SUCCESS';
export const GET_GENERAL_SETTINGS_FAILURE = '@@settings/GET_GENERAL_SETTINGS_FAILURE';
export const SET_GENERAL_SETTINGS_SUCCESS = '@@settings/SET_GENERAL_SETTINGS_SUCCESS';
export const SET_GENERAL_SETTINGS_FAILURE = '@@settings/SET_GENERAL_SETTINGS_FAILURE';
export const UPDATE_GENERAL_SETTINGS_SUCCESS = '@@settings/UPDATE_GENERAL_SETTINGS_SUCCESS';
export const UPDATE_GENERAL_SETTINGS_FAILURE = '@@settings/UPDATE_GENERAL_SETTINGS_FAILURE';

export const getGeneralSettings = () => ({
  type: GET_GENERAL_SETTINGS,
});

export const setGeneralSettings = settings => ({
  type: SET_GENERAL_SETTINGS,
  payload: settings,
});

export const updateGeneralSettings = settings => ({
  type: UPDATE_GENERAL_SETTINGS,
  payload: settings,
});

export const getGeneralSettingsSuccess = settings => ({
  type: GET_GENERAL_SETTINGS_SUCCESS,
  payload: settings,
});

export const getGeneralSettingsFailure = error => (dispatch) => {
  dispatch({
    type: GET_GENERAL_SETTINGS_FAILURE,
    payload: error,
  });
  if (error.code === 'not-found') {
    dispatch(setGeneralSettings({
      eventbrite: false,
    }));
  }
};

export const setGeneralSettingsSuccess = () => (dispatch) => {
  dispatch({ type: SET_GENERAL_SETTINGS_SUCCESS });
  dispatch(getGeneralSettings());
};

export const setGeneralSettingsFailure = error => ({
  type: SET_GENERAL_SETTINGS_FAILURE,
  payload: error,
});

export const updateGeneralSettingsSuccess = () => (dispatch) => {
  dispatch({ type: UPDATE_GENERAL_SETTINGS_SUCCESS });
  dispatch(getGeneralSettings());
};

export const updateGeneralSettingsFailure = (error, settings) => (dispatch) => {
  dispatch({
    type: UPDATE_GENERAL_SETTINGS_FAILURE,
    payload: error,
  });
  if (error.code === 'not-found') {
    dispatch(setGeneralSettings(settings));
  }
};
