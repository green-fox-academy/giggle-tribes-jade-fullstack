import { SET_KINGDOM_SUCCESS } from '../constants/ActionTypes';
export function kingdomReducer(state = 6, action) {
  switch (action.type) {
    case SET_KINGDOM_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
