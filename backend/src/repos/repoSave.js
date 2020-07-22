import {db} from '../data/connection';
import { paramsValidation } from './repoValidation';

export const save = (insertQuery,params) => {
    return new Promise ( async (resolve,reject) => {
        try {
            const returnData = (await db.query(insertQuery,paramsValidation(params))).results.insertId;
            resolve (returnData);
        } catch(error) {
            if (error.code === "ER_DUP_ENTRY") error.duplication = true;
            reject(error);
        }
    });
};
