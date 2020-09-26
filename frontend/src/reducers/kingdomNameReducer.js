import { SET_KINGDOMNAME_SUCCESS } from '../constants/ActionTypes';
export function kingdomNameReducer(state = '', action) {
  switch (action.type) {
    case SET_KINGDOMNAME_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
