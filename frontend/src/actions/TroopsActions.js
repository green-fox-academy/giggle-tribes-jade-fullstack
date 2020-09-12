import {
  UPDATE_TROOPS,
  UPDATE_TROOPS_SUCCESS,
  ADD_TROOP,
  ADD_TROOP_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';

import { fetchKingdom } from '../services/fetchKindom';

export const getTroopsAction = kingdomID => {
  return dispatch => {
    dispatch({
      type: UPDATE_TROOPS,
    });

    return fetchKingdom.get(kingdomID, 'troops').then(
      response =>
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: UPDATE_TROOPS_SUCCESS,
              payload: response.troops, //???
            }),
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error })
    );
  };
};

export const addTroopAction = kingdomID => {
  return dispatch => {
    dispatch({
      type: ADD_TROOP,
    });

    return fetchKingdom.post(kingdomID, 'troops', {}).then(
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

export const upgradeTroopAction = (kingdomID, amount, level) => {
  return dispatch => {
    dispatch({
      type: UPDATE_TROOPS,
    });

    return fetchKingdom.put(kingdomID, 'troops', { amount, level }).then(
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
