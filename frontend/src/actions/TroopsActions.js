import {
  UPDATE_TROOPS_SUCCESS,
  ADD_TROOP_SUCCESS,
  SET_ERROR_SUCCESS,
  ADD_TROOP,
  UPDATE_TROOPS,
} from '../constants/ActionTypes';

import { fetchByKingdom } from '../services/fetchService';

export const getTroopsAction = () => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TROOPS,
    });

    return fetchByKingdom(getState().kingdom, 'troops', {
      method: 'GET',
    }).then(
      response =>
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: UPDATE_TROOPS_SUCCESS,
              payload: response.troops,
            }),
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error })
    );
  };
};

export const addTroopAction = () => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TROOP,
    });

    return fetchByKingdom(getState().kingdom, 'troops', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      response => {
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: ADD_TROOP_SUCCESS,
              payload: response,
            });
      },
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error.error })
    );
  };
};

export const upgradeTroopAction = (amount, level) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TROOPS,
    });

    return fetchByKingdom(getState().kingdom, 'troops', {
      method: 'PUT',
      body: { amount: amount, level: level },
    }).then(
      response => {
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: UPDATE_TROOPS_SUCCESS,
              payload: response.troops,
            });
      },
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error.error })
    );
  };
};
