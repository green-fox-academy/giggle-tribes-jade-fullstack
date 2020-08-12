import { UPDATE_BUILDINGS } from '../constants/ActionTypes';
export function buildingsReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_BUILDINGS:
      return action.payload;
    default:
      return state;
  }
}
