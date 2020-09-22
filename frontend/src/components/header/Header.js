import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import HeaderTitle from './HeaderTitle';
import { setKingdomAction } from '../../actions/KingdomActions';

const loggedinHeaderItems = [
  { link: 'Settings', route: '/settings' },
  { link: 'Logout', route: '/login' },
];
const loggedoutHeaderItems = [
  { link: 'Login', route: '/login' },
  { link: 'Register', route: '/registration' },
];

const Header = ({ kingdom, token, set }) => {
  let headerItems = loggedoutHeaderItems;
  const [kingdomName, setKingdomName] = useState('');

  useEffect(() => {
    if (kingdom) {
      set(kingdom);
    }
  }, [kingdom, set]);

  if (token && kingdom) {
    headerItems = loggedinHeaderItems;
  }
  return (
    <nav className="header">
      <HeaderTitle
        name={token ? kingdomName : ''}
        route={token ? '/kingdom/buildings' : ''}
      />
      <div className="header">
        {headerItems.map((item, index) => (
          <Link
            className="header"
            key={index.toString()}
            onClick={() => {
              if (item.link === 'Logout') localStorage.clear();
            }}
            to={item.route}
          >
            {item.link}
          </Link>
        ))}
      </div>
    </nav>
  );
};

Header.propTypes = {
  set: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  kingdom: PropTypes.string.isRequired,
};

const mapStateToProps = ({ token, kingdom }) => {
  return { token, kingdom };
};
const mapDispatchToProps = dispatch => {
  return {
    set: (kingdomID, setKingdomName) => {
      dispatch(setKingdomAction(kingdomID, setKingdomName));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
