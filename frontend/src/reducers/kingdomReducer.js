import { SET_KINGDOM } from '../constants/ActionTypes';
export function kingdomReducer(state = 1, action) {
  switch (action.type) {
    case SET_KINGDOM:
      return action.payload;

    default:
      return state;
  }
}
