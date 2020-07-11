import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Header.css';

export default function ({ kingdomName }) {
  let title = <h1 className="header">{'Tribes of Vulpes'}</h1>;
  const loggedinHeaderItems = [
    { link: 'Settings', route: '/settings' },
    { link: 'Logout', route: '/logout' },
  ];
  const loggedoutHeaderItems = [
    { link: 'Login', route: '/login' },
    { link: 'Register', route: '/register' },
  ];
  let headerItems = loggedoutHeaderItems;

  const isToken = localStorage.getItem('token') ? true : false;

  if (isToken && kingdomName) {
    title = (
      <Link className="header" to={'/buildings'}>
        <h1 className="header">{kingdomName}</h1>
      </Link>
    );
    headerItems = loggedinHeaderItems;
  }
  return (
    <Router>
      <nav className="header">
        {title}

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
