/**
 * action definitions
 */
export const GET_APPLICATION = '@@aplication/GET_APPLICATION';
export const GET_APPLICATION_SUCCESS = '@@aplication/GET_APPLICATION_SUCCESS';
export const GET_APPLICATION_FAILURE = '@@aplication/GET_APPLICATION_FAILURE';
export const SET_APPLICATION = '@@aplication/SET_APPLICATION';
export const SET_APPLICATION_SUCCESS = '@@aplication/SET_APPLICATION_SUCCESS';
export const SET_APPLICATION_FAILURE = '@@aplication/SET_APPLICATION_FAILURE';
export const UPDATE_APPLICATION = '@@aplication/UPDATE_APPLICATION';
export const UPDATE_APPLICATION_SUCCESS = '@@aplication/UPDATE_APPLICATION';
export const UPDATE_APPLICATION_FAILURE = '@@aplication/UPDATE_APPLICATION_FAILURE';
export const AUTOSAVE_APPLICATION = '@@application/AUTOSAVE_APPLICATION';
export const AUTOSAVE_APPLICATION_FAILURE = '@@application/AUTOSAVE_APPLICATION_FAILURE';

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

export const autosaveApplication = applicaiton => (dispatch) => {
  dispatch({
    type: AUTOSAVE_APPLICATION,
    payload: applicaiton,
  });
  try {
    dispatch(updateApplication(applicaiton));
  } catch (error) {
    dispatch(autosaveApplication(error));
  }
};

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

export const updateApplicationFailure = (error, application) => (dispatch) => {
  dispatch({
    type: UPDATE_APPLICATION_FAILURE,
    payload: error,
  });

  if (error.code === 'not-found') {
    dispatch(setApplication(application));
  }
};

export const autoSaveApplicationFailure = error => ({
  type: AUTOSAVE_APPLICATION_FAILURE,
  payload: error,
});
