import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WithAuth from './WithAuth';
jest.mock('../services/authService');
import { authService } from '../services/authService';
import { act } from 'react-dom/test-utils';


const MockComponent = () => (
  <div>mockComponent</div>
)

test('authorized user', async () => {
  authService.isAuthenticated.mockImplementation( () => Promise.resolve(true) );
  let renderResult;
  await act( async () => {
    const ResultComponent = await WithAuth(MockComponent,'mockLink');
    renderResult= render(<ResultComponent />);
  });
  const { getByText } = renderResult;
  const element = getByText(/mockComponent/i);
  expect(element).toBeInTheDocument();
});

test('pending', async () => {
  authService.isAuthenticated.mockImplementation( () => Promise.resolve(null) );
  let renderResult;
  await act( async () => {
    const ResultComponent = await WithAuth(MockComponent,'mockLink');
    renderResult= render(<ResultComponent />);
  });
  const { queryByText } = renderResult;
  const element = queryByText(/mockComponent/i);
  expect(element).toBeNull();
});

test('unauthorized user', async () => {
  authService.isAuthenticated.mockImplementation( () => Promise.resolve(false) );
  let renderResult;
  await act( async () => {
    const ResultComponent = await WithAuth(MockComponent,'mockLink');
    renderResult= await render(
      <Router>
        <Route>
          <ResultComponent />
        </Route>
      </Router>
    );
  });
  const { queryByText } = renderResult;
  const element = queryByText(/mockComponent/i);
  expect(element).toBeNull();
});
