import {
  UPDATE_RESOURCES,
  UPDATE_RESOURCES_SUCCESS,
} from '../constants/ActionTypes';
export function resourcesReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_RESOURCES_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
