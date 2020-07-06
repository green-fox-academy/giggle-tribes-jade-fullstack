import React from 'react';
import {Link} from 'react-router-dom';
import './MenuItem.css';

const MenuItem = ({name,link}) => {
    return (
        <div className='menuitem'>
            <Link key={link} to={link}>
                <div className={'menuimage ' + name}></div>
            </Link>
            <h4>{name}</h4>
        </div>
    );
};

export default MenuItem;
