import { registerModel } from '../repos/registerModel';

const filterInput = (input) => {
    if ( !input.username && !input.password ) return 'Username and password are required.';
    if ( input.username && !input.password ) return 'Password is required.';
    if ( !input.username && input.password ) return 'Username is required.';
    if ( input.password.length < 8 ) return 'Password must be 8 characters.';
    return '';
};

export const registerService = (input) => {
    return new Promise( (resolve,reject) => {
        const invalidInput = filterInput(input);
        if ( invalidInput ) {
            reject(invalidInput);
        } else {
            registerModel(input.username,input.password,input.kingdomname)
                .then( response => resolve(response) )
                .catch( error => reject(error) );
        }
    });
};