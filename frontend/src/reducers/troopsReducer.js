import { UPDATE_TROOPS } from '../constants/ActionTypes';
export function troopsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_TROOPS:
      return action.payload;

    default:
      return state;
  }
}
