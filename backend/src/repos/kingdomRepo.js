import {db} from '../data/connection';
import { save } from './repoSave';
import { paramsValidation } from './repoValidation';

const insertQueries = {
    kingdom : 'INSERT INTO kingdoms (name) VALUES(?)',
    user_kingdom : 'INSERT INTO users_kingdoms (user_id,kingdom_id) VALUES(?,?)'
};

const selectQueries = {
    KingdomNullLocation :
    'SELECT kingdoms.id kingdomid, locations.id locationid FROM kingdoms LEFT JOIN locations ON locations.kingdom_id = kingdoms.id WHERE kingdoms.id = ? AND locations.id is null',
    KingdomBaseData :
    'SELECT users.id userid, kingdoms.name kingdomname FROM kingdoms RIGHT JOIN users_kingdoms ON users_kingdoms.kingdom_id = kingdoms.id RIGHT JOIN users ON users.id = users_kingdoms.user_id WHERE kingdom_id = ?',
    KingdomsData :
    'SELECT	kingdoms.id kingdom_id, kingdoms.name kingdomname, 1 population, locations.code location FROM kingdoms LEFT JOIN locations ON locations.kingdom_id = kingdoms.id'
};

const add = (table,params) => {
    return save(insertQueries[table],params);
};

const get = async (selection,params) => {
    return (await db.query(selectQueries[selection], paramsValidation(params))).results;
};

const repo = { add };
Object.keys(selectQueries)
  .forEach(queryName => repo['get'+queryName] = (params) => get(queryName, params));
export const kingdomRepo = repo;


