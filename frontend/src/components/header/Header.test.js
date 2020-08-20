import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

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
  Storage.prototype.getItem = jest.fn(key => {
    return;
  });
  await act(async () => {
    render(<MemoryRouter> <Header /> </MemoryRouter> , container);
  });
});

it('renders Header without crashing with token but without kingdomName', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });
  await act(async () => {
    render(<MemoryRouter> <Header /> </MemoryRouter>, container);
  });
});

it('renders Header without crashing with token and kingdomName', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });
  await act(async () => {
    render(<MemoryRouter> <Header kingdomName={'Test'} /> </MemoryRouter>, container);
  });
});

it('matches snapshot without token', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return;
  });

  await act(async () => {
    render(<MemoryRouter> <Header /> </MemoryRouter>, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token without kingdomID', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });

  await act(async () => {
    render(<MemoryRouter> <Header /> </MemoryRouter>, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token and kingdomName', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });

  await act(async () => {
    render(<MemoryRouter> <Header kingdomName="Test" /> </MemoryRouter>, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});
