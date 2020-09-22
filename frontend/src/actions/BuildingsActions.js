import {
  UPDATE_BUILDINGS_SUCCESS,
  ADD_BUILDING_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';

import { fetchByKingdom } from '../services/fetchService';

export const getBuildingsAction = kingdomID => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_BUILDINGS',
    });

    return fetchByKingdom(kingdomID, 'buildings', { method: 'GET' }).then(
      response =>
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: UPDATE_BUILDINGS_SUCCESS,
              payload: response.buildings,
            }),
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error })
    );
  };
};

export const addBuildingAction = (kingdomID, buildingType) => {
  return dispatch => {
    dispatch({
      type: 'ADD_BUILDING',
    });

    return fetchByKingdom(kingdomID, 'buildings', {
      method: 'POST',
      body: JSON.stringify({ type: buildingType }),
    }).then(
      response => {
        response.error
          ? dispatch({ type: SET_ERROR_SUCCESS, payload: response.error })
          : dispatch({
              type: ADD_BUILDING_SUCCESS,
              payload: response,
            });
      },
      error => dispatch({ type: SET_ERROR_SUCCESS, payload: error.error })
    );
  };
};
