import React, { useEffect } from 'react';
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

const Header = ({ kingdomName, kingdom, set }) => {
  let headerItems = loggedoutHeaderItems;

  useEffect(() => {
    if (kingdom) {
      set();
    }
  }, [set, kingdom]);

  if (kingdomName.length > 0) {
    headerItems = loggedinHeaderItems;
  }
  return (
    <nav className="header">
      <HeaderTitle
        name={
          typeof kingdomName === 'string' && kingdomName.length > 0
            ? kingdomName
            : ''
        }
        route={
          typeof kingdomName === 'string' && kingdomName.length > 0
            ? '/kingdom/buildings'
            : ''
        }
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
  kingdomName: PropTypes.string,
};

const mapStateToProps = ({ kingdom, kingdomName }) => {
  return { kingdom, kingdomName };
};
const mapDispatchToProps = dispatch => {
  return {
    set: () => dispatch(setKingdomAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
