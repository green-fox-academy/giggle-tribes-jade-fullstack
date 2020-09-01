import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getBuildingsAction, addBuildingAction } from './BuildingsActions';
import * as types from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockedStore = mockStore({
  kingdom: 1,
  buildings: [],
});

describe('Buildings actions', () => {
  it('should create an action to update building', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mockedStore = mockStore({
      kingdom: 1,
      buildings: [],
    });

    global.fetch = jest.fn(async () => {
      return await Promise.resolve({
        json: () =>
          Promise.resolve({
            buildings: [
              {
                id: 1,
                type: 'townhall',
                level: 1,
                hp: 1,
                started_at: 12345789,
                finished_at: 12399999,
              },
              {
                id: 2,
                type: 'farm',
                level: 1,
                hp: 1,
                started_at: 12345789,
                finished_at: 12399999,
              },
            ],
          }),
      });
    });

    const expectedActions = [
      { type: types.UPDATE_BUILDINGS },
      {
        type: types.UPDATE_BUILDINGS_SUCCESS,
        payload: [
          {
            id: 1,
            type: 'townhall',
            level: 1,
            hp: 1,
            started_at: 12345789,
            finished_at: 12399999,
          },
          {
            id: 2,
            type: 'farm',
            level: 1,
            hp: 1,
            started_at: 12345789,
            finished_at: 12399999,
          },
        ],
      },
    ];
    return mockedStore.dispatch(getBuildingsAction(1)).then(() => {
      expect(mockedStore.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to add building', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const mockedStore = mockStore({
      kingdom: 1,
      buildings: [],
    });

    global.fetch = jest.fn(async () => {
      return await Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 2,
            type: 'farm',
            level: 1,
            hp: 1,
            started_at: 12345789,
            finished_at: 12399999,
          }),
      });
    });

    const expectedActions = [
      { type: types.ADD_BUILDING },
      {
        type: types.ADD_BUILDING_SUCCESS,
        payload: {
          id: 2,
          type: 'farm',
          level: 1,
          hp: 1,
          started_at: 12345789,
          finished_at: 12399999,
        },
      },
    ];
    return mockedStore
      .dispatch(addBuildingAction(1, { type: 'farm' }))
      .then(() => {
        expect(mockedStore.getActions()).toEqual(expectedActions);
      });
  });
});
