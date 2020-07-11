import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {authService} from '../services/authService';

const WithAuth = (Component, redirectLocation) => {
    return function WithAuthComponent({...props}) {

        const [authenticated, setAuthenticated] = useState(null);

        useEffect( () => {
            authService.isAuthenticated()
                .then( result => setAuthenticated(result) );
        },[]);

        if (authenticated === null) return null;
        if (!authenticated) return ( <Redirect push to={redirectLocation} /> );
        if (authenticated) return ( <Component {...props} /> );
    };
};

export default WithAuth;
