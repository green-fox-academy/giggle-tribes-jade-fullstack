import {
  TYPE,
  SET_ERROR_SUCCESS,
  RESET_ERROR_SUCCESS,
} from '../constants/ActionTypes';

export const setErrorAction = error => {
  return dispatch => {
    dispatch({
      type: TYPE,
    });

    return dispatch({ type: SET_ERROR_SUCCESS, payload: error });
  };
};

export const resetErrorAction = () => {
  return dispatch => {
    return dispatch({ type: RESET_ERROR_SUCCESS });
  };
};
