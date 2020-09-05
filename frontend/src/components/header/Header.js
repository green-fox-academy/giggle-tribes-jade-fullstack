import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import HeaderTitle from './HeaderTitle';
import { fetchKingdom } from '../.././services/fetchKindom';

const loggedinHeaderItems = [
  { link: 'Settings', route: '/settings' },
  { link: 'Logout', route: '/logout' },
];
const loggedoutHeaderItems = [
  { link: 'Login', route: '/login' },
  { link: 'Register', route: '/registration' },
];

const Header = ({ kingdom }) => {
  let headerItems = loggedoutHeaderItems;
  const isToken = localStorage.getItem('TRIBES_TOKEN') ? true : false;

  const [kingdomName, setKingdomName] = useState('');

  useEffect(() => {
    if (kingdom) {
      fetchKingdom
        .get('map', '')
        .then(
          response =>
            response.kingdoms.find(k => k.kingdom_id === kingdom).kingdomname
        )
        .then(kingdomname => setKingdomName(kingdomname));
    }
  }, [kingdom]);

  if (isToken && kingdom) {
    headerItems = loggedinHeaderItems;
  }
  return (
    <nav className="header">
      <HeaderTitle
        name={isToken ? kingdomName : ''}
        route={isToken ? '/kingdom/buildings' : ''}
      />
      <div className="header">
        {headerItems.map((item, index) => (
          <Link className="header" key={index.toString()} to={item.route}>
            {item.link}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Header);
