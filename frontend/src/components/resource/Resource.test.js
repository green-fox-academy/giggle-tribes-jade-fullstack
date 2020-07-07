import React from 'react';
import ReactDOM from 'react-dom';

import { render } from '@testing-library/react';

import Resource from './Resource';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Resource />, div);
});

it('renders button correctly', () => {
  render(<Resource />);
});
