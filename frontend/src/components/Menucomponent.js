import React from 'react';

const MenuComponent = ({name}) => {
    return (
        <p key={name}>
            Rendered component: {name}
        </p>
    );
};

export default MenuComponent;
