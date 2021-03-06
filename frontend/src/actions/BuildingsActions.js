import {
  UPDATE_BUILDINGS,
  UPDATE_BUILDINGS_SUCCESS,
  ADD_BUILDING,
  ADD_BUILDING_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';

import { fetchByKingdom } from '../services/fetchService';

export const getBuildingsAction = () => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_BUILDINGS,
    });

    return fetchByKingdom(getState().kingdom, 'buildings', {
      method: 'GET',
    }).then(
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

export const addBuildingAction = buildingType => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_BUILDING,
    });

    return fetchByKingdom(getState().kingdom, 'buildings', {
      method: 'POST',
      body: { type: buildingType },
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
