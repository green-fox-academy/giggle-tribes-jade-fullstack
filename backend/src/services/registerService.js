import { registerModel } from '../repos/registerModel';

export const registerService = (input) => {
    return new Promise( (resolve,reject) => {
        if ( input.username && !input.password ) {
            reject('Password is required.');
        } else if ( !input.username && input.password ) {
            reject('Username is required.');
        } else if ( !input.username && !input.password ) {
            reject('Username and password are required.');
        } else if ( input.password.length < 8 ) {
            reject('Password must be 8 characters.');
        } else {
            registerModel(input.username,input.password,input.kingdomname)
                .then( response => resolve(response) )
                .catch( error => reject(error) );
        }
    });
};