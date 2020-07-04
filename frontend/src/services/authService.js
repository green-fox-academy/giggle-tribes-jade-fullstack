
const isAuthenticated = () => {

    return new Promise( resolve => {
        fetch('http://api.icndb.com/jokes/random')
        .then( (result) => result.json() )
        .then( (json) => {
            if (json.type === 'success') {
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
