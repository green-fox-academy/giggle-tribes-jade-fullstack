import {db} from '../data/connection';

const insertQueries = {
    user : 'INSERT INTO user (name,password) VALUES(?,?)',
    kingdom : 'INSERT INTO kingdom (name) VALUES(?)',
    user_kingdom : 'INSERT INTO user_kingdom (user_id,kingdom_id) VALUES(?,?)'
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

const save = (table,params) => {
    return new Promise ( async (resolve,reject) => {
        try {
            const returnData = (await db.query(insertQueries[table],paramsValidation(params))).results.insertId;
            resolve (returnData);
        } catch(error) {
            if (error.code === "ER_DUP_ENTRY") error.duplication = true;
            reject(error);
        }
    });
};

export const repo = {
    save
};
