import * as actions from '../constants/ActionTypes';
import { fetchByKingdom } from '../services/fetchService';

export const setKingdomAction = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actions.SET_KINGDOM,
    });

    return fetchByKingdom(getState().kingdom, 'map', {
      method: 'GET',
    }).then(response => {
      if (response.error) {
        dispatch({
          type: actions.SET_ERROR_SUCCESS,
          payload: response.error,
        });
      } else {
        [
          {
            type: actions.SET_USER_SUCCESS,
            payload: response.userId,
          },
          {
            type: actions.SET_KINGDOMNAME_SUCCESS,
            payload: response.kingdomName,
          },
          {
            type: actions.UPDATE_BUILDINGS_SUCCESS,
            payload: response.buildings,
          },
          {
            type: actions.UPDATE_TROOPS_SUCCESS,
            payload: response.troops,
          },
        ].forEach(action => dispatch(action));
      }
    });
  };
};
