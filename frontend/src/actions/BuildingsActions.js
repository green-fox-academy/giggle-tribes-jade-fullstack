import {
  UPDATE_BUILDINGS,
  UPDATE_BUILDINGS_SUCCESS,
  ADD_BUILDING,
  ADD_BUILDING_SUCCESS,
  SET_ERROR_SUCCESS,
} from '../constants/ActionTypes';

import { fetchKingdom } from '../services/fetchKindom';

export const getBuildingsAction = kingdomID => {
  return dispatch => {
    dispatch({
      type: UPDATE_BUILDINGS,
    });

    return fetchKingdom.get(kingdomID, 'buildings').then(
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
      type: ADD_BUILDING,
    });

    return fetchKingdom
      .post(kingdomID, 'buildings', { type: buildingType })
      .then(
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
