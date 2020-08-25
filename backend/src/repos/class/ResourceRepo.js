import QueryHandler from './QueryHandler';

export class ResourceRepo extends QueryHandler {

    static errorMessages = {
        missingKingdomId: 1,
        missingType: 2,
        missingAmount: 3,
        missingGeneration: 4
    };

    constructor(db) {
        super(db);
    };

    validateParams = ({kingdomId,type,amount,generation}) => {
        if (!kingdomId) throw new Error(ResourceRepo.errorMessages.missingKingdomId);
        if (!type) throw new Error(ResourceRepo.errorMessages.missingType);
        if (amount === undefined) throw new Error(ResourceRepo.errorMessages.missingAmount);
        if (generation === undefined) throw new Error(ResourceRepo.errorMessages.missingGeneration);
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
        if (!kingdomId) throw new Error(ResourceRepo.errorMessages.missingKingdomId);
        const query = this.validateQuery`SELECT * FROM kingdoms_resources WHERE kingdom_id = ${kingdomId}`;
        return await (this.sendQuery(query));
    };


};
