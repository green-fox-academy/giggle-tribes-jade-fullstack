import {
  SET_ERROR_SUCCESS,
  RESET_ERROR_SUCCESS,
} from '../constants/ActionTypes';
export function errorReducer(state = null, action) {
  switch (action.type) {
    case SET_ERROR_SUCCESS:
      return action.payload;
    case RESET_ERROR_SUCCESS:
      return null;
    default:
      return state;
  }
}
