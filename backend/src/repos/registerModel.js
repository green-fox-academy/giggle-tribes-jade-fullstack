import {db} from '../data/connection';

const addUser = async (username,password) => {
    return (await db.query('INSERT INTO user (name,password) VALUES(?,?)',[username,password],'insertId')).specialReturn; 
};

const addKingdom = async (kingdomname) => {
    kingdomname = (kingdomname) ? kingdomname : `${username}'s kingdom`;
    return (await db.query('INSERT INTO kingdom (name) VALUES(?)',[kingdomname],'insertId')).specialReturn;
};

const addUserKingdom = (userid,kingdomid) => {
    db.query('INSERT INTO user_kingdom (user_id,kingdom_id) VALUES(?,?)',[userid,kingdomid],'');
};

export const registerModel = (username,password,kingdomname) => {
    return new Promise( async (resolve,reject) => {
        try {
            const userid = await addUser(username,password);
            const kingdomid = await addKingdom(kingdomname);
            addUserKingdom(userid,kingdomid);
            resolve({
                'id' : userid,
                'username' : username,
                'kingdomId' : kingdomid
            });
        } catch(error) {
            if (error.code === 'ER_DUP_ENTRY') reject("Username is already taken.");
            reject(error);
        }
    });
};
