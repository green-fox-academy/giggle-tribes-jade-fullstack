import { SET_ERROR_SUCCESS } from '../constants/ActionTypes';

export const setErrorAction = error => {
  return dispatch => {
    dispatch({
      type: 'SET_ERROR',
    });

    dispatch({ type: SET_ERROR_SUCCESS, payload: error });
  };
};
