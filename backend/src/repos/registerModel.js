import {db} from '../data/connection';

export const registerModel = (username,password,kingdomname) => {
    return new Promise( async (resolve,reject) => {

        try {

        const userid = (await db.query('INSERT INTO user (name,password) VALUES(?,?)',[username,password],'insertId')).specialReturn;
  
        kingdomname = (kingdomname) ? kingdomname : `${username}'s kingdom`;
        let kingdomid = await db.query('SELECT id FROM kingdom WHERE name=?',[kingdomname],'')
        if (kingdomid.results.length === 0) {
            kingdomid = (await db.query('INSERT INTO kingdom (name) VALUES(?)',[kingdomname],'insertId')).specialReturn;
        } else {
            kingdomid = kingdomid.results[0].id;
        }

        await db.query('INSERT INTO user_kingdom (user_id,kingdom_id) VALUES(?,?)',[userid,kingdomid],'');

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
