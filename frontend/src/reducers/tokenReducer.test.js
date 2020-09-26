import * as types from '../constants/ActionTypes';
import { tokenReducer } from './tokenReducer';

describe('token reducer', () => {
  it('should return the initial state', () => {
    expect(tokenReducer(null, {})).toEqual(null);
  });

  it('should handle SET_TOKEN_SUCCESS', () => {
    expect(
      tokenReducer(null, {
        type: types.SET_TOKEN_SUCCESS,
        payload: 1,
      })
    ).toEqual(1);

    expect(
      tokenReducer(1, {
        type: types.SET_TOKEN_SUCCESS,
        payload: 2,
      })
    ).toEqual(2);
  });
});
