import { UPDATE_TROOPS_SUCCESS } from '../constants/ActionTypes';
export function troopsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_TROOPS_SUCCESS:
      return [...state, action.payload];

    default:
      return state;
  }
}
