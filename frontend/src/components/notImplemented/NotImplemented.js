import React,{ useState } from 'react';
import {Redirect} from 'react-router-dom';
import './notImplemented.css';

const NotImplemented = () => {

    const [authenticated, setAuthenticated] = useState(true);

    const redirect = () => {
        localStorage.clear();
        setAuthenticated(false);
    };

    if (authenticated) return (
        <div className='wrapper'>
            <p>Not Implemented yet.</p>
            <button onClick={ redirect }>Logout and go to Login</button>
        </div>
    );
    
    if (!authenticated) return ( <Redirect push to='/login' /> );
};

export default NotImplemented;
