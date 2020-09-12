import {
  SET_KINGDOM_SUCCESS,
  } from '../constants/ActionTypes';

import { fetchKingdom } from '../services/fetchKindom';

export const getLoginAction = kingdomID => {
    return dispatch => {
      dispatch({
        type: 'kiscica',
      });
  
      return fetchKingdom.get(kingdomID, 'login').then(
        response =>
          response.error
            ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
            : dispatch({
                type: SET_KINGDOM_SUCCESS,
                payload: response.token, //??? a local sotrage-ban be kell állítani a tokent, authService.js?
              }),
        error => dispatch({ type: SET_ERROR_SUCCESS, payload: error })
      );
    };
  };
  