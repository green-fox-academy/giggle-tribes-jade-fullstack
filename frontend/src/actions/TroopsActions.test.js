import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getTroopsAction, addTroopAction } from './TroopsActions';
import * as types from '../constants/ActionTypes';

describe('Troops actions', () => {
  it('should create an action to update troops', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mockedStore = mockStore({
      kingdom: 1,
      troops: [],
    });

    global.fetch = jest.fn(async () => {
      return await Promise.resolve({
        json: () =>
          Promise.resolve({
            troops: [
              {
                id: 1,
                level: 1,
                hp: 1,
                attack: 1,
                defence: 1,
                started_at: 12345789,
                finished_at: 12399999,
              },
              {
                id: 2,
                level: 1,
                hp: 1,
                attack: 1,
                defence: 1,
                started_at: 12345789,
                finished_at: 12399999,
              },
            ],
          }),
      });
    });

    const expectedActions = [
      { type: types.TYPE },
      {
        type: types.UPDATE_TROOPS_SUCCESS,
        payload: [
          {
            id: 1,
            level: 1,
            hp: 1,
            attack: 1,
            defence: 1,
            started_at: 12345789,
            finished_at: 12399999,
          },
          {
            id: 2,
            level: 1,
            hp: 1,
            attack: 1,
            defence: 1,
            started_at: 12345789,
            finished_at: 12399999,
          },
        ],
      },
    ];
    return mockedStore.dispatch(getTroopsAction(1)).then(() => {
      expect(mockedStore.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to add troop', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mockedStore = mockStore({
      kingdom: 1,
      troops: [],
    });

    global.fetch = jest.fn(async () => {
      return await Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 1,
            level: 1,
            hp: 1,
            attack: 1,
            defence: 1,
            started_at: 12345789,
            finished_at: 12399999,
          }),
      });
    });

    const expectedActions = [
      { type: types.TYPE },
      {
        type: types.ADD_TROOP_SUCCESS,
        payload: {
          id: 1,
          level: 1,
          hp: 1,
          attack: 1,
          defence: 1,
          started_at: 12345789,
          finished_at: 12399999,
        },
      },
    ];
    return mockedStore.dispatch(addTroopAction(1)).then(() => {
      expect(mockedStore.getActions()).toEqual(expectedActions);
    });
  });
});
