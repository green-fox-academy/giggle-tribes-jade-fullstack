import * as types from '../constants/ActionTypes';
import { kingdomNameReducer } from './kingdomReducer';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(kingdomNameReducer(null, {})).toEqual(null);
  });

  it('should handle SET_KINGDOM_SUCCESS', () => {
    expect(
      kingdomNameReducer(null, {
        type: types.SET_KINGDOMNAME_SUCCESS,
        payload: 1,
      })
    ).toEqual(1);

    expect(
      kingdomNameReducer(1, {
        type: types.SET_KINGDOMNAME_SUCCESS,
        payload: 2,
      })
    ).toEqual(2);
  });
});
