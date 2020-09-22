import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
jest.mock('../.././services/fetchService');
import { fetchByKingdom } from '../.././services/fetchService';

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
  fetchByKingdom.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdomId: 1,
          kingdomname: 'Mocked Kingdom',
          token: null,
        },
      ],
    })
  );
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
});

it('renders Header without crashing with token but without kingdomName', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    token: 'dummy_token',
  });
  mockedStore.dispatch = jest.fn();

  fetchByKingdom.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdomId: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
});

it('renders Header without crashing with token and kingdomId', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
  });
  mockedStore.dispatch = jest.fn();
  fetchByKingdom.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdomId: 1,
          kingdomname: 'Mocked Kingdom',
          token: 'dummy_token',
        },
      ],
    })
  );
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
});

it('matches snapshot without token', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
    token: null,
  });
  mockedStore.dispatch = jest.fn();
  fetchByKingdom.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdomId: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token without kingdomID', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    token: 'dummy_token',
  });
  mockedStore.dispatch = jest.fn();
  fetchByKingdom.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdomId: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});

it('matches snapshot with token and kingdomId', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
    kingdom: 1,
    token: 'kitten',
  });
  mockedStore.dispatch = jest.fn();
  fetchByKingdom.mockImplementation(() =>
    Promise.resolve({
      kingdoms: [
        {
          kingdomId: 1,
          kingdomname: 'Mocked Kingdom',
        },
      ],
    })
  );
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});
