import {
  SET_KINGDOM,
  SET_KINGDOM_SUCCESS,
  SET_TOKEN_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';
import { generalFetch } from '../services/fetchService';

export const loginAction = ({ username, password }) => {
  return dispatch => {
    dispatch({
      type: SET_KINGDOM,
    });

    return generalFetch('sessions', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => {
        if (data.error) {
          dispatch({ type: SET_ERROR_SUCCESS, payload: data.error });
          return false;
        } else {
          localStorage.setItem('TRIBES_TOKEN', data.token);
          localStorage.setItem('kingdom', data.kingdomId);
          dispatch({ type: SET_KINGDOM_SUCCESS, payload: data.kingdomId });
          dispatch({ type: SET_TOKEN_SUCCESS, payload: data.token });

          return true;
        }
      })
      .then(result => result);
  };
};
