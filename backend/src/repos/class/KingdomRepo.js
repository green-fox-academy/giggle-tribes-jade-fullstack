import QueryHandler from './QueryHandler';

export class KingdomRepo extends QueryHandler {

    constructor(db,errorCodes) {
        super(db,errorCodes);
    };

    async get({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const query = this.validateQuery`
        SELECT
            kingdoms.id kingdom_id,
            kingdoms.name kingdom_name,
            users_kingdoms.user_id user_id,
            locations.code location
        FROM kingdoms
        RIGHT JOIN users_kingdoms ON users_kingdoms.kingdom_id = kingdoms.id
        RIGHt JOIN locations ON locations.kingdom_id = kingdoms.id
        WHERE kingdoms.id = ${kingdomId}
        `;
        const dbData = await (this.sendQuery(query));
        if (dbData.length === 0) throw new Error(this.errorCodes.invalidKingdomId);
        return dbData;
    };

    async add({kingdomName}) {
        if (!kingdomName) throw new Error(this.errorCodes.missingKingdomName);
        const query = this.validateQuery`INSERT INTO kingdoms (name) VALUES(${kingdomName})`;
        return await (this.sendQuery(query));
    };

    async attachUser({kingdomId, userId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!userId) throw new Error(this.errorCodes.missingUserId);
        const query = this.validateQuery`INSERT INTO users_kingdoms (user_id,kingdom_id) VALUES(${userId},${kingdomId})`;
        return await (this.sendQuery(query));
    };

};
