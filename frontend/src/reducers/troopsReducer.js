import {
  UPDATE_TROOPS_SUCCESS,
  ADD_TROOP_SUCCESS,
} from '../constants/ActionTypes';
export function troopsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_TROOPS_SUCCESS:
      return action.payload;
    case ADD_TROOP_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
}
