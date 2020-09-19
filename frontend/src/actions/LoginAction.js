import {
  SET_KINGDOM_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';

export const loginAction = ({ username, password }) => {
  return dispatch => {
    dispatch({
      type: 'START_LOGIN',
    });

    return fetch('http://localhost:5000/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch({ type: SET_ERROR_SUCCESS, payload: data.error });
          return false;
        } else {
          localStorage.setItem('TRIBES_TOKEN', data.token);
          dispatch({
            type: SET_KINGDOM_SUCCESS,
            payload: data.kingdomId,
          });
          return true;
        }
      });
  };
};
