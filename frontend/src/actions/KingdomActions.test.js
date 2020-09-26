import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setKingdomAction } from './KingdomActions';
import * as types from '../constants/ActionTypes';

global.fetch = jest.fn(async () => {
  return await Promise.resolve({
    json: () =>
      Promise.resolve({
        kingdomId: 1,
        kingdomName: 'Dummy',
        userId: 1,
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
        troops: [],
        buildings: [],
      }),
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockedStore = mockStore({
  user: 'user',
  kingdom: '1',
  kingdomName: 'kingdomName',
  resources: [],
  buildings: [],
  troops: [],
  token: 'token',
  error: '',
});
beforeEach(() => {
  fetch.mockClear();
});

describe('Kingdom actions', () => {
  it('should create an action to update user, kingdomName, troops, buildings, resources', () => {
    const expectedActions = [
      { type: types.SET_KINGDOM },
      {
        payload: 1,
        type: types.SET_USER_SUCCESS,
      },
      {
        payload: 'Dummy',
        type: types.SET_KINGDOMNAME_SUCCESS,
      },
      {
        payload: [],
        type: types.UPDATE_BUILDINGS_SUCCESS,
      },
      {
        payload: [],
        type: types.UPDATE_TROOPS_SUCCESS,
      },
    ];
    return mockedStore.dispatch(setKingdomAction(1)).then(() => {
      expect(mockedStore.getActions()).toEqual(expectedActions);
    });
  });
});
