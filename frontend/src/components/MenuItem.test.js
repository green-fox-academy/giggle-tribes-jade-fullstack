import React from 'react';
import { render } from '@testing-library/react';
import MenuItem from './MenuItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';

test('renders menuitem with text', () => {
  const { getByText } = render(
    <Router>
      <Route path='/'>
        <MenuItem name='test' link='/test'/>
      </Route>
    </Router>
  );
  const element = getByText(/test/i);
  expect(element).toBeInTheDocument();
});
