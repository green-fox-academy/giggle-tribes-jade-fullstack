import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setErrorAction, resetErrorAction } from './ErrorActions';
import * as types from '../constants/ActionTypes';

describe('Error actions', () => {
  const middlewares = [thunk];
  it('should create an action to set error', () => {
    const mockStore = configureMockStore(middlewares);
    const mockedStore = mockStore({
      error: null,
    });

    const expectedActions = [
      { type: types.SET_ERROR },
      {
        type: types.SET_ERROR_SUCCESS,
        payload: 'dummyError',
      },
    ];

    mockedStore.dispatch(setErrorAction('dummyError'));
    expect(mockedStore.getActions()).toEqual(expectedActions);
  });

  it('should create an action to reset error', () => {
    const mockStore = configureMockStore(middlewares);
    const mockedStore = mockStore({
      error: 'dummyError',
    });

    const expectedActions = [
      {
        type: types.RESET_ERROR_SUCCESS,
      },
    ];

    mockedStore.dispatch(resetErrorAction());
    expect(mockedStore.getActions()).toEqual(expectedActions);
  });
});
