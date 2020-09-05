import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
jest.mock('../.././services/fetchKindom');
import { fetchKingdom } from '../.././services/fetchKindom';

import Header from './Header';

const history = createMemoryHistory({
  initialEntries: ['/'],
});

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
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
  });
  mockedStore.dispatch = jest.fn();
  Storage.prototype.getItem = jest.fn(key => {});
  fetchKingdom.get.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdom_id: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <MemoryRouter><Header /></MemoryRouter>
    </Provider>,
    container
    );
  });
});

it('renders Header without crashing with token but without kingdomName', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({});
  mockedStore.dispatch = jest.fn();
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });
  fetchKingdom.get.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdom_id: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <MemoryRouter><Header /></MemoryRouter>
    </Provider>,
    container
    );
  });
});

it('renders Header without crashing with token and kingdomId', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
  });
  mockedStore.dispatch = jest.fn();
  fetchKingdom.get.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdom_id: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <MemoryRouter><Header /></MemoryRouter>
    </Provider>,
    container
    );
  });
});

it('matches snapshot without token', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return false;
  });
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
  });
  mockedStore.dispatch = jest.fn();
  fetchKingdom.get.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdom_id: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <MemoryRouter><Header /></MemoryRouter>
    </Provider>,
    container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token without kingdomID', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });
  const mockStore = configureStore([]);
  const mockedStore = mockStore({});
  mockedStore.dispatch = jest.fn();
  fetchKingdom.get.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdom_id: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <MemoryRouter><Header /></MemoryRouter>
    </Provider>,
    container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token and kingdomId', async () => {
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
  });
  mockedStore.dispatch = jest.fn();
  fetchKingdom.get.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdom_id: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <MemoryRouter><Header /></MemoryRouter>
    </Provider>,
    container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});
