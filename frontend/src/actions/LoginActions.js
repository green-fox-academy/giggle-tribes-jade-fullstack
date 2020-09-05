//fetch request indítás, ha error, akkor mi van (), ha success

import {
  SET_KINGDOM_SUCCESS,
  } from '../constants/ActionTypes';

  
export const getTroopsAction = kingdomID => {
    return dispatch => {
      dispatch({
        type: 'kiscica',
      });
  
      return fetchKingdom.get(kingdomID, 'troops').then(
        response =>
          response.error
            ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
            : dispatch({
                type: SET_KINGDOM_SUCCESS,
                payload: response.token, //??? a local sotrage-ban be kell állítani a tokent
              }),
        error => dispatch({ type: SET_ERROR_SUCCESS, payload: error })
      );
    };
  };
  