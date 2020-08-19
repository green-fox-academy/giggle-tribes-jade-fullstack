import * as types from '../constants/ActionTypes';
import { kingdomReducer } from './kingdomReducer';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(kingdomReducer(null, {})).toEqual(null);
  });

  it('should handle SET_KINGDOM_SUCCESS', () => {
    expect(
      kingdomReducer(null, {
        type: types.SET_KINGDOM_SUCCESS,
        payload: 1,
      })
    ).toEqual(1);

    expect(
      kingdomReducer(1, {
        type: types.SET_KINGDOM_SUCCESS,
        payload: 2,
      })
    ).toEqual(2);
  });
});
