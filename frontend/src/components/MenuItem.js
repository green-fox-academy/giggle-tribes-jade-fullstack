import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuItem.css';

const MenuItem = ({name,link}) => {
    return (
        <NavLink  className='menuitem' key={link} to={link}>
            <div className={'menuimage ' + name}></div>
            <h4>{name}</h4>
        </NavLink>
    );
};

export default MenuItem;
