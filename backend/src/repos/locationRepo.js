import QueryHandler from './QueryHandler';

export class LocationRepo extends QueryHandler {

    constructor(db,errorCodes) {
        super(db,errorCodes);
    };

    validateParams({kingdomId,locationCode}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!locationCode) throw new Error(this.errorCodes.missingLocationCode);
        if (locationCode.length < 3) throw new Error(this.errorCodes.invalidLocationCode);
    };

    async add({kingdomId,locationCode}) {
        this.validateParams({kingdomId,locationCode});
        const query = this.validateQuery`INSERT INTO locations (kingdom_id,code) VALUES(${kingdomId},${locationCode})`;
        return await (this.sendQuery(query));
    };

    async getByKingdomId({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const query = this.validateQuery`SELECT * FROM locations WHERE kingdom_id = ${kingdomId}`;
        return await (this.sendQuery(query));
    };

};
