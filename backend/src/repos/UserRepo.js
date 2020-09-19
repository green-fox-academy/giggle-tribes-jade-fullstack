import QueryHandler from './QueryHandler';

export class UserRepo extends QueryHandler {

    constructor( db, errorCodes ) {
        super( db, errorCodes );
    };

    validateParams({userName, password}) {
        if (!userName) throw new Error(this.errorCodes.missingUserName);
        if (userName == '') throw new Error(this.errorCodes.invalidUserName);
        if (!password) throw new Error(this.errorCodes.missingPassword);
        if (password.length < 8) throw new Error(this.errorCodes.invalidPassword);
    };

    async add({userName, password}) {
        this.validateParams({userName, password});
        const query = this.validateQuery`INSERT INTO users (name,password) VALUES(${userName},${password})`;
        try {
            return await (this.sendQuery(query));
        } catch(error) {
            if (error.code === 'ER_DUP_ENTRY') throw new Error(this.errorCodes.usedUserName);
            throw error;
        }
    };

    async getByName({userName}) {
        if (!userName) throw new Error(this.errorCodes.missingUserName);
        const query = this.validateQuery`SELECT * FROM users WHERE name=${userName}`;
        return await (this.sendQuery(query));
    };

    async getById({userId}) {
        if (!userId) throw new Error(this.errorCodes.missingUserId);
        const query = this.validateQuery`SELECT * FROM users WHERE id=${userId}`;
        const dbData = await (this.sendQuery(query));
        if (dbData.length === 0) throw new Error(this.errorCodes.invalidUserId);
        return dbData;
    };

    async getAuthentication({userName, password}) {
        if (!userName) throw new Error(this.errorCodes.missingUserName);
        if (!password) throw new Error(this.errorCodes.missingPassword);
        const query = this.validateQuery`
        SELECT
            users.id userId,
            users_kingdoms.kingdom_id kingdomId 
        FROM users 
        LEFT JOIN users_kingdoms ON users.id = users_kingdoms.user_id
        WHERE users.name=${userName} AND users.password=${password}
        `;
        const dbData = await (this.sendQuery(query));
        if (dbData.length === 0) throw new Error(this.errorCodes.invalidUserNameAndPassword);
        return dbData;
    };

};
