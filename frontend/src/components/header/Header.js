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

const Header = ({ kingdom, token, kingdomName, set }) => {
  let headerItems = loggedoutHeaderItems;

  useEffect(() => {
    set(kingdom);
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
  kingdom: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  kingdomName: PropTypes.string,
};

const mapStateToProps = ({ token, kingdom, kingdomName }) => {
  return { token, kingdom, kingdomName };
};
const mapDispatchToProps = dispatch => {
  return {
    set: kingdomID => dispatch(setKingdomAction(kingdomID)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
