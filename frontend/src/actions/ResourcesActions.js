import {
  UPDATE_RESOURCES_SUCCESS,
  SET_ERROR_SUCCESS,
  UPDATE_RESOURCES,
} from '../constants/ActionTypes';

import { fetchByKingdom } from '../services/fetchService';

export const setResources = () => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_RESOURCES,
    });

    return fetchByKingdom(getState().kingdom, 'resource', {
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
