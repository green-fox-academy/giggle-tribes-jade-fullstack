import { save } from './repoSave';

const insertQueries = {
    buildings : 'INSERT INTO buildings (id,kingdom_id,type,level,hp,started_at,finished_at) VALUES(?,?,?,?,?,?,?)'
};

const add = (params) => {
    return save(insertQueries['buildings'],params);
};

export const buildingRepo = {
    add
};
