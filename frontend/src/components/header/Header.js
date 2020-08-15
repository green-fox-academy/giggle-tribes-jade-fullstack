import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Header.css';
import HeaderTitle from './HeaderTitle';

const loggedinHeaderItems = [
  { link: 'Settings', route: '/settings' },
  { link: 'Logout', route: '/logout' },
];
const loggedoutHeaderItems = [
  { link: 'Login', route: '/login' },
  { link: 'Register', route: '/registration' },
];

export default function ({ kingdomName }) {
  let headerItems = loggedoutHeaderItems;
  const isToken = localStorage.getItem('TRIBES_TOKEN') ? true : false;

  if (isToken && kingdomName) {
    headerItems = loggedinHeaderItems;
  }
  return (
    <Router>
      <nav className="header">
        <HeaderTitle name={isToken && kingdomName} route="/buildings" />
        <div className="header">
          {headerItems.map((item, index) => (
            <Link className="header" key={index.toString()} to={item.route}>
              {item.link}
            </Link>
          ))}
        </div>
      </nav>
    </Router>
  );
}
