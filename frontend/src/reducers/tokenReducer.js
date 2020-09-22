import { SET_TOKEN_SUCCESS } from '../constants/ActionTypes';
export function tokenReducer(state = null, action) {
  switch (action.type) {
    case SET_TOKEN_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
