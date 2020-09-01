import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import Troops from './Troops';
import { store } from '../../store';

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
          {
            id: 3,
            level: 2,
            hp: 2,
            attack: 2,
            defence: 2,
            started_at: 12345789,
            finished_at: 12399999,
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

it('should dispatch an action when rendered', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
    troops: [],
  });
  mockedStore.dispatch = jest.fn();
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Troops />
      </Provider>,
      container
    );
  });
  expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
});

it('matches snapeshot', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Troops />
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toMatchSnapshot();
});
