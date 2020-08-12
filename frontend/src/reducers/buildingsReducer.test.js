import * as types from '../constants/ActionTypes';
import { buildingsReducer } from './buildingsReducer';

describe('resource reducer', () => {
  it('should return the initial state', () => {
    expect(buildingsReducer([], {})).toEqual([]);
  });

  it('should handle UPDATE_BUILDINGS_SUCCESS', () => {
    expect(
      buildingsReducer([], {
        type: types.UPDATE_BUILDINGS_SUCCESS,
        payload: { id: 1, type: 'mine', level: 1 },
      })
    ).toEqual([{ id: 1, type: 'mine', level: 1 }]);

    expect(
      buildingsReducer([{ id: 1, type: 'mine', level: 1 }], {
        type: types.UPDATE_BUILDINGS_SUCCESS,
        payload: { id: 2, type: 'farm', level: 1 },
      })
    ).toEqual([
      { id: 1, type: 'mine', level: 1 },
      { id: 2, type: 'farm', level: 1 },
    ]);
  });
});
