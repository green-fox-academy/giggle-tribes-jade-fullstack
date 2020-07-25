import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
        <p>Login screen.</p>
        <Link to='/kingdom'>kingdom</Link>
        <p>Registration screen.</p>
        <Link to='/registration'>Registration</Link>
        </>
    );
};

export default Login;
