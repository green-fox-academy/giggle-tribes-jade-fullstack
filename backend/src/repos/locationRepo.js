import { save } from './repoSave';

const insertQueries = {
    location : 'INSERT INTO location (kingdom_id,code) VALUES(?,?)'
};

const add = (params) => {
    return save(insertQueries['location'],params);
};

export const locationRepo = {
    add
};
