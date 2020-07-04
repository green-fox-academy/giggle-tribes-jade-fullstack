import React from 'react';
import {Link} from 'react-router-dom';

const MenuItem = ({name,link}) => {
    return (
        <p key={name}>
            <Link to={link}>{name}</Link>
        </p>
    );
};

export default MenuItem;
