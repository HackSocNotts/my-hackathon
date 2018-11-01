/**
 * action definitions
 */
export const GET_APPLICATION = '@@application/GET_APPLICATION';
export const GET_APPLICATION_SUCCESS = '@@application/GET_APPLICATION_SUCCESS';
export const GET_APPLICATION_FAILURE = '@@application/GET_APPLICATION_FAILURE';
export const SET_APPLICATION = '@@application/SET_APPLICATION';
export const SET_APPLICATION_SUCCESS = '@@application/SET_APPLICATION_SUCCESS';
export const SET_APPLICATION_FAILURE = '@@application/SET_APPLICATION_FAILURE';
export const UPDATE_APPLICATION = '@@application/UPDATE_APPLICATION';
export const UPDATE_APPLICATION_SUCCESS = '@@application/UPDATE_APPLICATION';
export const UPDATE_APPLICATION_FAILURE = '@@application/UPDATE_APPLICATION_FAILURE';
export const AUTOSAVE_APPLICATION = '@@application/AUTOSAVE_APPLICATION';
export const AUTOSAVE_APPLICATION_SUCCESS = '@@application/AUTOSAVE_APPLICATION_SUCCESS';
export const AUTOSAVE_APPLICATION_FAILURE = '@@application/AUTOSAVE_APPLICATION_FAILURE';
export const SUBMIT_APPLICATION = '@@application/SUBMIT_APPLICATION';

/**
 * action creators
 */
export const getApplication = () => ({
  type: GET_APPLICATION,
});

export const setApplication = applicaiton => ({
  type: SET_APPLICATION,
  payload: applicaiton,
});

export const updateApplication = applicaiton => ({
  type: UPDATE_APPLICATION,
  payload: applicaiton,
});

export const autosaveApplication = applicaiton => ({
  type: AUTOSAVE_APPLICATION,
  payload: applicaiton,
});

export const getApplicationSuccess = application => ({
  type: GET_APPLICATION_SUCCESS,
  payload: application,
});

export const getApplicationFailure = error => (dispatch) => {
  dispatch({
    type: GET_APPLICATION_FAILURE,
    payload: error,
  });

  if (error.code === 'not-found') {
    dispatch(setApplication({
      status: 'INCOMPLETE',
    }));
  }
};

export const setApplicationSuccess = () => (dispatch) => {
  dispatch({
    type: SET_APPLICATION_SUCCESS,
  });

  dispatch(getApplication());
};

export const setApplicationFailure = error => ({
  type: SET_APPLICATION_FAILURE,
  payload: error,
});

export const updateApplicationSuccess = () => ({
  type: UPDATE_APPLICATION_SUCCESS,
});

export const updateApplicationFailure = error => ({
  type: UPDATE_APPLICATION_FAILURE,
  payload: error,
});

export const autoSaveApplicationSuccess = () => ({
  type: AUTOSAVE_APPLICATION_SUCCESS,
});

export const autoSaveApplicationFailure = error => ({
  type: AUTOSAVE_APPLICATION_FAILURE,
  payload: error,
});

export const submitApplication = application => ({
  type: SUBMIT_APPLICATION,
  payload: application,
});
