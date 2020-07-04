import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MenuItem from './MenuItem';
import MenuComponent from './Menucomponent';

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
        <Router>
            <nav className='Menu'>
                {menuItems.map( (menuItem) => (
                    <>
                        <MenuItem name={menuItem.name} link={'/kingdom' + menuItem.link}/>
                        <Route path={'/kingdom' + menuItem.link} render={ () => (<menuItem.component name={menuItem.name} />) } />
                    </>
                ))}
            </nav>
        </Router>
    );
};

export default Menu;
