import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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
  const dispatch = jest.fn();
  await act(async () => {
    render(
      <Provider store={store}>
        <Resource />
      </Provider>,
      container
    );
  });
  expect(dispatch).toHaveBeenCalled();
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
