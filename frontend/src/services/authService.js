
import { env } from '../env';

const isAuthenticated = () => {

    return new Promise( resolve => {
        fetch(`${env.BACKEND_URL}/api/auth`, {
            method: 'POST',
            headers: {
                'TRIBES_TOKEN': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NCIsImtpbmdkb21JZCI6IjI2IiwiaWF0IjoxNTkzODUzNjMyfQ.tVSCRpB1lD6Cdw4J25VdS-2OkO6pRrF4GbzoTM4TqYI',
            }
        })
        .then( (result) => result.json() )
        .then( (json) => {
            if (json.userId) {
                resolve(true);
            } else {
                resolve(false);
            }
        } );
    });
    
};

export const authService = {
    isAuthenticated
};
