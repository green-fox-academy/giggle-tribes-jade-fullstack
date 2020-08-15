import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import Resource from './Resource';
import { store } from '../../store';

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
  });
  mockedStore.dispatch = jest.fn();
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Resource />
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
        <Resource />
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toMatchSnapshot();
});
