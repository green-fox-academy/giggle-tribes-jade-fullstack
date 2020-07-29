import React from 'react';
import { render } from '@testing-library/react';
import Registration from './Registration';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { act } from "react-dom/test-utils";

test('renders registration page', () => {
    const { getByText } = render(
      <Router>
        <Route path='/resgistration'>
          <MenuItem name='test' link='/test'/>
        </Route>
      </Router>
    );
    const element = getByText(/test/i);
    expect(element).toBeInTheDocument();
  });

