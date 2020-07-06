import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MenuItem from './MenuItem';
import MenuComponent from './MenuComponent';
import './Menu.css';

const Menu = () => {

    const menuItems = [
        {
            name: 'Buildings',
            link: '/buildings',
            component: MenuComponent
        },
        {
            name: 'Troops',
            link: '/troops',
            component: MenuComponent
        },
        {
            name: 'Battle',
            link: '/battle',
            component: MenuComponent
        },
        {
            name: 'Leaderboard',
            link: '/lederboard',
            component: MenuComponent
        }
    ]

    return (
        <>
            <nav className='Menu'>
                {menuItems.map( (menuItem) => (
                    <MenuItem key={menuItem.name} name={menuItem.name} link={'/kingdom' + menuItem.link}/>
                ))}
            </nav>
            {menuItems.map( (menuItem) => (
                <Route key={menuItem.link} path={'/kingdom' + menuItem.link} render={ () => (<menuItem.component name={menuItem.name} />) } />
            ))}
        </>
    );
};

export default Menu;
