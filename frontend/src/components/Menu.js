import React from 'react';
import MenuItem from './MenuItem';

import './Menu.css';

const Menu = ({menuItems}) => {
    return (
        <nav className='Menu'>
            {menuItems.map( (menuItem) => (
                <MenuItem key={menuItem.name} name={menuItem.name} link={'/kingdom' + menuItem.link}/>
            ))}
        </nav>
    );
};

export default Menu;
