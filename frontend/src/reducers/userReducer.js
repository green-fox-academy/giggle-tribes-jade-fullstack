import { SET_USER } from '../constants/ActionTypes';
export function userReducer(state = null, action) {
  if (action.type === SET_USER) {
    return action.payload;
  } else {
    return state;
  }
}
