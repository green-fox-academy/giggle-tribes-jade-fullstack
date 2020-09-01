import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Academy from './Academy';
import { store } from '../../../store';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('matches snapeshot', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Academy />
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toMatchSnapshot();
});
