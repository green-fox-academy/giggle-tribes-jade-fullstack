import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import TroopUpgradeBox from './TroopUpgradeBox';
import { store } from '../../store';

global.fetch = jest.fn(async () => {
  return await Promise.resolve({
    json: () =>
      Promise.resolve({
        troops: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
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

describe('TroopUpgradeBox tests', () => {
  it('should dispatch an action when clicked', async () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      kingdom: '1',
      buildings: [{ type: 'academy', level: 2 }],
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
          <TroopUpgradeBox
            open={true}
            setOpen={() => {}}
            level={1}
            troopAmount={10}
          />
        </Provider>,
        container
      );
    });

    const button = document.getElementsByClassName('TroopUpgradeBTN')[0];
    Simulate.click(button);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch an action when clicked, not enough money', async () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      kingdom: '1',
      buildings: [{ type: 'academy', level: 2 }],
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
          <TroopUpgradeBox
            open={true}
            setOpen={() => {}}
            level={1}
            troopAmount={10}
          />
        </Provider>,
        container
      );
    });
    const button = document.getElementsByClassName('TroopUpgradeBTN')[0];
    Simulate.click(button);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch an action when clicked, academy level is too low', async () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      kingdom: '1',
      buildings: [{ type: 'academy', level: 1 }],
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
          <TroopUpgradeBox
            open={true}
            setOpen={() => {}}
            level={1}
            troopAmount={10}
          />
        </Provider>,
        container
      );
    });
    const button = document.getElementsByClassName('TroopUpgradeBTN')[0];
    Simulate.click(button);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('matches snapeshot', async () => {
    Storage.prototype.getItem = jest.fn(key => {
      return 'dummy';
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <TroopUpgradeBox
            open={true}
            setOpen={() => {}}
            level={1}
            troopAmount={10}
          />
        </Provider>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
