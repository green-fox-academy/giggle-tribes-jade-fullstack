import * as types from '../constants/ActionTypes';
import { troopsReducer } from './troopsReducer';

describe('troops reducer', () => {
  it('should return the initial state', () => {
    expect(troopsReducer([], {})).toEqual([]);
  });

  it('should handle UPDATE_TROOPS_SUCCESS', () => {
    expect(
      troopsReducer([], {
        type: types.UPDATE_TROOPS_SUCCESS,
        payload: [{ id: 1, level: 1 }],
      })
    ).toEqual([{ id: 1, level: 1 }]);

    expect(
      troopsReducer([{ id: 1, level: 1 }], {
        type: types.UPDATE_TROOPS_SUCCESS,
        payload: [
          { id: 1, level: 1 },
          { id: 2, level: 1 },
        ],
      })
    ).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 1 },
    ]);

    expect(
      troopsReducer([{ id: 1, level: 1 }], {
        type: types.UPDATE_TROOPS_SUCCESS,
        payload: [{ id: 2, level: 1 }],
      })
    ).toEqual([{ id: 2, level: 1 }]);
  });

  it('should handle ADD_TROOP_SUCCESS', () => {
    expect(
      troopsReducer([], {
        type: types.ADD_TROOP_SUCCESS,
        payload: { id: 1, level: 1 },
      })
    ).toEqual([{ id: 1, level: 1 }]);

    expect(
      troopsReducer([{ id: 1, level: 1 }], {
        type: types.ADD_TROOP_SUCCESS,
        payload: { id: 2, level: 1 },
      })
    ).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 1 },
    ]);
  });
});
