import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
        <p>Login screen.</p>
        <Link to='/kingdom'>kingdom</Link>
        
        <p>kingdoms's map</p>
        <Link to='/kingdom/map'>kingdom's map</Link>
        
        <p>kingdom's buildings</p>
        <Link to='/kingdom/buildings'>kingdom's buildings</Link>
        </>
    );
};

export default Login;
