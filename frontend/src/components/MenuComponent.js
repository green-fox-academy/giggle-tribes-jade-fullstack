import React from 'react';
import WithAuth from './WithAuth';

const MenuComponent = ({name}) => {
    return (
        <p>
            Rendered component: {name}
        </p>
    );
};


export default WithAuth(MenuComponent,'/login');
