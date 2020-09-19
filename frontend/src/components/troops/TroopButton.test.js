import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import TroopButton from './TroopButton';
import TroopUpgradeBox from './TroopUpgradeBox';
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

describe('CreateTroopButton tests', () => {
  it('dialog must be rendered when button is clicked', async () => {
    const handleClickOpen = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <TroopButton troopSummary={{ amount: 1, level: 1 }} />
        </Provider>,
        container
      );
    });
    const button = document.querySelector('button');

    Simulate.click(button);
    const isDialog = document.getElementsByClassName('MuiDialog-root')
      ? true
      : false;
    expect(isDialog).toBe(true);
  });

  it('matches snapeshot', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <TroopButton troopSummary={{ amount: 1, level: 1 }} />
        </Provider>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
