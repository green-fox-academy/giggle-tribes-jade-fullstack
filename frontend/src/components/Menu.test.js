import React from 'react';
import { render } from '@testing-library/react';
import Menu from './Menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';

test('renders menu with menuitems', () => {
  const menuItems = [
    {
        name: 'menu1',
        link: '/menu1'
    },
    {
        name: 'menu2',
        link: '/menu2'
    }
  ];
  const { getAllByText } = render(
    <Router>
      <Route path='/'>
        <Menu menuItems={menuItems}/>
      </Route>
    </Router>
  );
  const menuArray = getAllByText(/menu/i);
  expect(menuArray.length).toBe(menuItems.length);
});
