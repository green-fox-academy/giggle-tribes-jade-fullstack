import QueryHandler from './QueryHandler';

export class ResourceRepo extends QueryHandler {

    constructor(db,errorCodes) {
        super(db,errorCodes);
    };

    validateParams = ({kingdomId,type,amount,generation}) => {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!type) throw new Error(this.errorCodes.missingResourceType);
        if (amount === undefined) throw new Error(this.errorCodes.missingResourceAmount);
        if (generation === undefined) throw new Error(this.errorCodes.missingResourceGeneration);
    };

    async add({kingdomId,type,amount,generation}) {
        this.validateParams({kingdomId,type,amount,generation});
        const query = this.validateQuery`
            INSERT INTO kingdoms_resources 
            (kingdom_id, type, amount, generation, updatedAt) 
            VALUES(${kingdomId},${type},${amount},${generation},now())
        `;
        return await (this.sendQuery(query));
    };

    async update({kingdomId,type,amount,generation}) {
        this.validateParams({kingdomId,type,amount,generation});
        const query = this.validateQuery`
            UPDATE kingdoms_resources
            SET amount=${amount}, generation=${generation}, updatedAt=now()
            WHERE kingdom_id=${kingdomId} AND type =${type}
        `;
        return await (this.sendQuery(query));
    };

    async get({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const query = this.validateQuery`SELECT * FROM kingdoms_resources WHERE kingdom_id = ${kingdomId}`;
        return await (this.sendQuery(query));
    };


};
