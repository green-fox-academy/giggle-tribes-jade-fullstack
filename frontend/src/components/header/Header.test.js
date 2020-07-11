import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Header from './Header';

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

it('renders Header without crashing without token', async () => {
  global.localStorage = jest.fn(() => {
    return {};
  });
  await act(async () => {
    render(<Header />, container);
  });
});

it('renders Header without crashing with token but without kingdomName', async () => {
  global.localStorage = jest.fn(() => {
    return { token: 'dummy_token' };
  });
  await act(async () => {
    render(<Header />, container);
  });
});

it('renders Header without crashing with token and kingdomName', async () => {
  global.localStorage = jest.fn(() => {
    return { token: 'dummy_token' };
  });
  await act(async () => {
    render(<Header kingdomName={'Test'} />, container);
  });
});

it('matches snapshot without token', async () => {
  global.localStorage = jest.fn(() => {
    return {};
  });

  await act(async () => {
    render(<Header />, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token without kingdomID', async () => {
  global.localStorage = jest.fn(() => {
    return { token: 'dummy_token' };
  });

  await act(async () => {
    render(<Header />, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token and kingdomName', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });

  global.localStorage.getItem = jest.fn(key => {
    return 'dummy_token';
  });

  await act(async () => {
    render(<Header kingdomName="Test" />, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});
