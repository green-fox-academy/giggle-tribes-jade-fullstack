import { save } from './repoSave';

const insertQueries = {
    user : 'INSERT INTO user (name,password) VALUES(?,?)',
};

const add = (params) => {
    return save(insertQueries['user'],params);
};

export const userRepo = {
    add
};
