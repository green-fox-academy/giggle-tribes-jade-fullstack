import { SET_TOKEN_SUCCESS } from '../constants/ActionTypes';
export function tokenReducer(
  state = localStorage.getItem('TRIBES_TOKEN'),
  action
) {
  switch (action.type) {
    case SET_TOKEN_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
