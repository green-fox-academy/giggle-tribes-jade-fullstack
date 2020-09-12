import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import App from './App';
import { store } from './store';

test('renders login screen', () => {
  const { getByText } = render(
  <Provider store={store}>
    <App />
  </Provider>,
  );
  const text = getByText(/login/i);
  expect(text).toBeInTheDocument();
});
