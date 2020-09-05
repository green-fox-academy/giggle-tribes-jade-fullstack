import {
  UPDATE_BUILDINGS_SUCCESS,
  ADD_BUILDING_SUCCESS,
} from '../constants/ActionTypes';
export function buildingsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_BUILDINGS_SUCCESS:
      return action.payload;
    case ADD_BUILDING_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
}
