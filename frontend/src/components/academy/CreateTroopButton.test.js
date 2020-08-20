import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import CreateTroopButton from './CreateTroopButton';
import { store } from '../../store';

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

let container;
beforeEach(() => {
  fetch.mockClear();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('CreateTroopButton tests', () => {
  it('should dispatch an action when clicked', async () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      kingdom: 1,
      buildings: [{ type: 'townhall', level: 1 }],
      resources: [
        {
          type: 'food',
          amount: 57024,
          generation: 1,
          updatedAt: '2020-08-12T17:47:32.000Z',
        },
        {
          type: 'gold',
          amount: 57024,
          generation: 1,
          updatedAt: '2020-08-12T17:47:32.000Z',
        },
      ],
      troops: [],
    });
    mockedStore.dispatch = jest.fn();
    await act(async () => {
      render(
        <Provider store={mockedStore}>
          <CreateTroopButton />
        </Provider>,
        container
      );
    });
    const button = document.querySelector('button');

    Simulate.click(button);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch an action when clicked, not enough money', async () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      kingdom: 1,
      buildings: [{ type: 'townhall', level: 1 }],
      resources: [
        {
          type: 'food',
          amount: 57024,
          generation: 1,
          updatedAt: '2020-08-12T17:47:32.000Z',
        },
        {
          type: 'gold',
          amount: 9,
          generation: 1,
          updatedAt: '2020-08-12T17:47:32.000Z',
        },
      ],
      troops: [],
    });
    mockedStore.dispatch = jest.fn();
    await act(async () => {
      render(
        <Provider store={mockedStore}>
          <CreateTroopButton />
        </Provider>,
        container
      );
    });
    const button = document.querySelector('button');

    Simulate.click(button);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch an action when clicked, no townhall capacity', async () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      kingdom: 1,
      buildings: [{ type: 'townhall', level: 1 }],
      resources: [
        {
          type: 'food',
          amount: 57024,
          generation: 1,
          updatedAt: '2020-08-12T17:47:32.000Z',
        },
        {
          type: 'gold',
          amount: 57024,
          generation: 1,
          updatedAt: '2020-08-12T17:47:32.000Z',
        },
      ],
      troops: new Array(100),
    });
    mockedStore.dispatch = jest.fn();
    await act(async () => {
      render(
        <Provider store={mockedStore}>
          <CreateTroopButton />
        </Provider>,
        container
      );
    });
    const button = document.querySelector('button');

    Simulate.click(button);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('matches snapeshot', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <CreateTroopButton />
        </Provider>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
