import QueryHandler from './QueryHandler';

export class LocationRepo extends QueryHandler {

    constructor(db,errorCodes) {
        super(db,errorCodes);
    };

    validateParams = ({kingdomId,code}) => {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!code) throw new Error(this.errorCodes.missingLocationCode);
        if (code.length < 3) throw new Error(this.errorCodes.invalidLocationCode);
    };

    async add({kingdomId,code}) {
        this.validateParams({kingdomId,code});
        const query = this.validateQuery`INSERT INTO locations (kingdom_id,code) VALUES(${kingdomId},${code})`;
        return await (this.sendQuery(query));
    };

};
