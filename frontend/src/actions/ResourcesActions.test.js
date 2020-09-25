import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setResources } from './ResourcesActions';
import * as types from '../constants/ActionTypes';

global.fetch = jest.fn(async () => {
  return await Promise.resolve({
    json: () =>
      Promise.resolve({
        resources: [
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
        ],
      }),
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockedStore = mockStore({
  kingdom: 1,
  resources: [],
});
beforeEach(() => {
  fetch.mockClear();
});

describe('Resource actions', () => {
  it('should create an action to update resources', () => {
    const expectedActions = [
      { type: types.UPDATE_RESOURCES },
      {
        type: types.UPDATE_RESOURCES_SUCCESS,
        payload: [
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
        ],
      },
    ];
    return mockedStore.dispatch(setResources(1)).then(() => {
      expect(mockedStore.getActions()).toEqual(expectedActions);
    });
  });
});
