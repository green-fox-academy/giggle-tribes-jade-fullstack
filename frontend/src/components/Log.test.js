import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Log from './Log';

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

it('matches snapshot', async () => {
  await act(async () => {
    render(<Log />, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});
