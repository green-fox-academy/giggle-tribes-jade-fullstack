import {db} from '../data/connection';
import { save } from './repoSave';
import { paramsValidation } from './repoValidation';

const insertQueries = {
    kingdom : 'INSERT INTO kingdom (name) VALUES(?)',
    user_kingdom : 'INSERT INTO user_kingdom (user_id,kingdom_id) VALUES(?,?)'
};

const selectQueries = {
    kingdomNullLocation :
    'SELECT kingdom.id kingdomid, location.id locationid FROM kingdom LEFT JOIN location ON location.kingdom_id = kingdom.id WHERE kingdom.id = ? AND location.id is null',
    kingdomBaseData :
    'SELECT user.id userid, kingdom.name kingdomname FROM kingdom RIGHT JOIN user_kingdom ON user_kingdom.kingdom_id = kingdom.id RIGHT JOIN user ON user.id = user_kingdom.user_id WHERE kingdom_id = ?',
    kingdomsData :
    'SELECT	kingdom.id kingdom_id, kingdom.name kingdomname, 1 population, location.code location FROM kingdom LEFT JOIN location ON location.kingdom_id = kingdom.id'
};

const add = (table,params) => {
    return save(insertQueries[table],params);
};

const get = async (selection,params) => {
    return (await db.query(selectQueries[selection], paramsValidation(params))).results;
};

export const kingdomRepo = {
    add,
    get
};


