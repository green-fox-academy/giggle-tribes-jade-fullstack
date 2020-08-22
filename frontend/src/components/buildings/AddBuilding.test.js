import React from 'react';
import { render } from '@testing-library/react';
import AddBuilding from './AddBuilding';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../store';

test('renders buttons in proper quantity', () => {
  const buttons = [
    { type: 'farm', cost: 1000 },
    { type: 'mine', cost: 100 },
    { type: 'academy', cost: 100 },
  ];
  const { getAllByText } = render(
    <Provider store={store}>
      <Router>
        <Route path="/">
          <AddBuilding />
        </Route>
      </Router>
    </Provider>
  );
  buttons.forEach(button => {
    const regex = `Add ${
      button.type.charAt(0).toUpperCase() + button.type.slice(1)
    }`;
    const insertions = getAllByText(regex);
    expect(insertions.length).toBe(1);
  });
});
