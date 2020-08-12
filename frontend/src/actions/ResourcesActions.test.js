import { resourcesActions } from './ResourcesActions';
import * as types from '../constants/ActionTypes';

describe('actions', () => {
  it('should create an action to update resources', () => {
    const resources = [
      {
        type: 'food',
        amount: 6824,
        generation: 1,
        updatedAt: '2020-07-08T18:32:01.000Z',
      },
      {
        type: 'gold',
        amount: 6824,
        generation: 1,
        updatedAt: '2020-07-08T18:32:01.000Z',
      },
    ];
    const expectedAction = {
      type: types.UPDATE_RESOURCES,
      payload: resources,
    };
    //I have no idea
  });
});
