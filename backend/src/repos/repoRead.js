import {db} from '../data/connection';

const selectQueries = {
    kingdomNullLocation :
    'SELECT kingdom.id, location.id FROM kingdom LEFT JOIN location ON location.kingdom_id = kingdom.id WHERE kingdom.id = ? AND location.id is null',
    kingdomBaseData :
    'SELECT user.id userid, kingdom.name kingdomname FROM kingdom RIGHT JOIN user_kingdom ON user_kingdom.kingdom_id = kingdom.id RIGHT JOIN user ON user.id = user_kingdom.user_id WHERE kingdom_id = ?',
    kingdomsData :
    'SELECT	kingdom.id kingdom_id, kingdom.name kingdomname, 1 population, location.code location FROM kingdom LEFT JOIN location ON location.kingdom_id = kingdom.id'
};

class ValidationError extends Error {
    constructor(field) {
      super();
      this.validationError = `The ${field} was not provided.`;
    }
};
const paramsValidation = (params) => {
    Object.keys(params).forEach( key => {
        if (params[key] === "") throw new ValidationError(key);
    });
    return Object.values(params);
};

export const read = (selection,params) => {
    return new Promise ( async (resolve,reject) => {
        try {
            const returnData = (await db.query(selectQueries[selection], paramsValidation(params))).results;
            if (returnData.length === 0) throw new ValidationError('proper data');
            resolve ( returnData.length === 1 ? returnData[0] : returnData );
        } catch(error) {
            reject(error);
        }
    });
};
