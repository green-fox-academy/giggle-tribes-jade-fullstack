import { SET_USER_SUCCESS } from '../constants/ActionTypes';
export function userReducer(state = null, action) {
  if (action.type === SET_USER_SUCCESS) {
    return action.payload;
  } else {
    return state;
  }
}
