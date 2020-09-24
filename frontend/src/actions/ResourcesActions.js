import {
  UPDATE_RESOURCES_SUCCESS,
  SET_ERROR_SUCCESS,
  TYPE,
} from '../constants/ActionTypes';

import { fetchByKingdom } from '../services/fetchService';

export const setResources = kingdomId => {
  return dispatch => {
    dispatch({
      type: TYPE,
    });

    return fetchByKingdom(kingdomId, 'resource', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      resources =>
        dispatch({
          type: UPDATE_RESOURCES_SUCCESS,
          payload: resources.resources,
        }),
      error => dispatch({ type: SET_ERROR_SUCCESS, error })
    );
  };
};
