import * as types from '../constants/ActionTypes';
import { resourcesReducer } from './resourcesReducer';

describe('resource reducer', () => {
  it('should return the initial state', () => {
    expect(resourcesReducer([], {})).toEqual([]);
  });

  it('should handle UPDATE_RESOURCES_SUCCESS', () => {
    expect(
      resourcesReducer(null, {
        type: types.UPDATE_RESOURCES_SUCCESS,
        payload: [
          { type: 'gold', amount: 500, generation: 0 },
          { type: 'food', amount: 500, generation: 0 },
        ],
      })
    ).toEqual([
      { type: 'gold', amount: 500, generation: 0 },
      { type: 'food', amount: 500, generation: 0 },
    ]);

    expect(
      resourcesReducer(
        [
          { type: 'gold', amount: 500, generation: 0 },
          { type: 'food', amount: 500, generation: 0 },
        ],
        {
          type: types.UPDATE_RESOURCES_SUCCESS,
          payload: [
            { type: 'gold', amount: 100, generation: 0 },
            { type: 'food', amount: 500, generation: 0 },
          ],
        }
      )
    ).toEqual([
      { type: 'gold', amount: 100, generation: 0 },
      { type: 'food', amount: 500, generation: 0 },
    ]);
  });
});
