import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
jest.mock('../.././services/fetchService');
import { fetchByKingdom } from '../.././services/fetchService';

import Header from './Header';
import { store } from '../../store';

const history = createMemoryHistory({
  initialEntries: ['/'],
});
const mockStore = configureStore([]);

fetchByKingdom.mockImplementation(() =>
  Promise.resolve({
    kingdomId: '1',
    kingdomName: 'Mocked Kingdom',
    token: null,
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
    troops: [],
    buildings: [],
  })
);

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
  const mockedStore = mockStore({
    kingdom: '',
    kingdomName: '',
    token: '',
  });
  mockedStore.dispatch = jest.fn();

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
    return 'dummy';
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
});

it('matches snapshot without token and kingdom', async () => {
  const mockedStore = mockStore({
    kingdom: '',
    token: '',
    kingdomName: '',
  });
  mockedStore.dispatch = jest.fn();

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
    return 'dummy';
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
      container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});
