import {
  UPDATE_RESOURCES,
  UPDATE_RESOURCES_SUCCESS,
  UPDATE_RESOURCES_FAILURE,
} from '../constants/ActionTypes';

import { fetchKingdom } from '../services/fetchKindom';

export const setResources = kingdomID => {
  return dispatch => {
    dispatch({
      type: UPDATE_RESOURCES,
    });

    return fetchKingdom.get(kingdomID, 'resource').then(
      resources =>
        dispatch({
          type: UPDATE_RESOURCES_SUCCESS,
          payload: resources.resources,
        }),
      error => dispatch({ type: UPDATE_RESOURCES_FAILURE, error })
    );
  };
};
