import {db} from '../data/connection';
import { save } from './repoSave';
import { paramsValidation } from './repoValidation';

const insertQueries = {
    kingdom : 'INSERT INTO kingdom (name) VALUES(?)',
    user_kingdom : 'INSERT INTO user_kingdom (user_id,kingdom_id) VALUES(?,?)'
};

const selectQueries = {
    KingdomNullLocation :
    'SELECT kingdom.id kingdomid, location.id locationid FROM kingdom LEFT JOIN location ON location.kingdom_id = kingdom.id WHERE kingdom.id = ? AND location.id is null',
    KingdomBaseData :
    'SELECT user.id userid, kingdom.name kingdomname FROM kingdom RIGHT JOIN user_kingdom ON user_kingdom.kingdom_id = kingdom.id RIGHT JOIN user ON user.id = user_kingdom.user_id WHERE kingdom_id = ?',
    KingdomsData :
    'SELECT	kingdom.id kingdom_id, kingdom.name kingdomname, 1 population, location.code location FROM kingdom LEFT JOIN location ON location.kingdom_id = kingdom.id'
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


