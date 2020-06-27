import { repo } from '../repos/repoSave';

export const filterInput = (input) => {
    if ( !input.username && !input.password ) return 'Username and password are required.';
    if ( input.username && !input.password ) return 'Password is required.';
    if ( !input.username && input.password ) return 'Username is required.';
    if ( input.password.length < 8 ) return 'Password must be 8 characters.';
    return '';
};

export const registerService = (input) => {
    return new Promise( async (resolve,reject) => {
        const invalidInput = filterInput(input);
        if ( invalidInput ) {
            reject(invalidInput);
        } else {
            try {
                const userid = await repo.save('user',[input.username,input.password]);
                const kingdomid = await repo.save('kingdom',[input.kingdomname]);
                await repo.save('user_kingdom',[userid,kingdomid]);
                resolve({
                    'id' : userid,
                    'username' : input.username,
                    'kingdomId' : kingdomid
                });
            } catch(error) {
                if (error.duplication) reject('Username is already taken.');
                reject(error);
            }
        }
    });
};
