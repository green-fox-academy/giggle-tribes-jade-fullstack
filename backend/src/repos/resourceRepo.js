import {db} from '../data/connection';
import { paramsValidation } from './repoValidation';

const updateQueries = {
    Amount :
    'UPDATE kingdom_resource SET amount=?, updatedAt=now() WHERE kingdom_id=? AND type =?',
};

const update = async (table,params) => {
    return (await db.query(updateQueries[table], paramsValidation(params))).results;
};

const repo = { update };
Object.keys(updateQueries)
  .forEach(queryName => repo['update'+queryName] = (params) => update(queryName, params));
export const resourceRepo = repo;


