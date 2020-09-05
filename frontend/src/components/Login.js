import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
        <p>Login screen.</p>
        <Link to='/kingdom'>kingdom</Link>
        
        <p>kingdoms's map</p>
        <Link to='/registration'>Registration</Link>
        
        <p>Registration screen.</p>
        <Link to='/kingdom/map'>kingdom's map</Link>
        
        </>
    );
};

export default Login;
