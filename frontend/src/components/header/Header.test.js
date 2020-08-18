import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import Header from './Header';
import { store } from '../../store';

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
  });
  mockedStore.dispatch = jest.fn();
  Storage.prototype.getItem = jest.fn(key => {
  });
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <Header />
    </Provider>,
    container
    );
  });
});

it('renders Header without crashing with token but without kingdomName', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
  });
  mockedStore.dispatch = jest.fn();
  Storage.prototype.getItem = jest.fn(key => {
    return 'dummy_token';
  });
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <Header />
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
    kingdom: 1
  });
  mockedStore.dispatch = jest.fn();
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <Header />
    </Provider>,
    container
    );
  });
});

it('matches snapshot without token', async () => {
  Storage.prototype.getItem = jest.fn(key => {
  });
  await act(async () => {
    render(
    <Provider store={store}>
        <Header />
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
  const mockedStore = mockStore({
  });
  mockedStore.dispatch = jest.fn();
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <Header />
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
  await act(async () => {
    render(
    <Provider store={mockedStore}>
        <Header />
    </Provider>,
    container
    );
  });
  expect(container.innerHTML).toMatchSnapshot();
});
