import {db} from '../data/connection';

const registerQuery = {
    user : 'INSERT INTO user (name,password) VALUES(?,?)',
    kingdom : 'INSERT INTO kingdom (name) VALUES(?)',
    user_kingdom : 'INSERT INTO user_kingdom (user_id,kingdom_id) VALUES(?,?)'
};

export const registerData = (table,params) => {
    console.log(params)
    return new Promise ( async (resolve,reject) => {
        try {
            const returnData = (await db.query(registerQuery[table],params,"insertId")).specialReturn;
            resolve (returnData);
        } catch(error) {
            if (error.code === "ER_DUP_ENTRY") error.duplication = true;
            reject(error);
        }
    });
};
