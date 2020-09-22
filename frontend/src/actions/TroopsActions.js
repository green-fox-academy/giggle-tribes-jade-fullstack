import {
  UPDATE_TROOPS_SUCCESS,
  ADD_TROOP_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';

import { fetchByKingdom } from '../services/fetchService';

export const getTroopsAction = kingdomId => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_TROOPS',
    });

    return fetchByKingdom(kingdomId, 'troops', {
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

export const addTroopAction = kingdomId => {
  return dispatch => {
    dispatch({
      type: 'ADD_TROOP',
    });

    return fetchByKingdom(kingdomId, 'troops', {
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

export const upgradeTroopAction = (kingdomId, amount, level) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_TROOPS',
    });

    return fetchByKingdom(kingdomId, 'troops', {
      method: 'PUT',
      body: { amount, level },
    }).then(
      response => {
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: UPDATE_TROOPS_SUCCESS,
              payload: response,
            });
      },
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error.error })
    );
  };
};
