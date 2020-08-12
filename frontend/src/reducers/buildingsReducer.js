import { UPDATE_BUILDINGS_SUCCESS } from '../constants/ActionTypes';
export function buildingsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_BUILDINGS_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
}
