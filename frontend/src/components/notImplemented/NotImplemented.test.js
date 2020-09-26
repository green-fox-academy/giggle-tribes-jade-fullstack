import React from 'react';
import { render } from '@testing-library/react';
import NotImplemented from './NotImplemented';
import { BrowserRouter as Router, Route } from 'react-router-dom';

test('renders paragraph with button', () => {
  const { getAllByText } = render(
    <Router>
      <Route path='/'>
        <NotImplemented />
      </Route>
    </Router>
  );
  const p = getAllByText('Not Implemented yet.');
  expect(p.length).toBe(1);
  const button = getAllByText('Logout and go to Login');
  expect(button.length).toBe(1);
});
