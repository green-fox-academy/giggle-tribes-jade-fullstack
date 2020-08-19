import * as types from '../constants/ActionTypes';
import { userReducer } from './userReducer';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(null, {})).toEqual(null);
  });

  it('should handle SET_USER_SUCCESS', () => {
    expect(
      userReducer(null, {
        type: types.SET_USER_SUCCESS,
        payload: 1,
      })
    ).toEqual(1);

    expect(
      userReducer(1, {
        type: types.SET_USER_SUCCESS,
        payload: 2,
      })
    ).toEqual(2);
  });
});
