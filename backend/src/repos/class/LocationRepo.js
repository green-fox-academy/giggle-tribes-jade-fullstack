import QueryHandler from './QueryHandler';

export class LocationRepo extends QueryHandler {

    static errorMessages = {
        missingKingdomId: 1,
        missingCode: 2,
        invalidCode: 3
    };

    constructor(db) {
        super(db);
    };

    validateParams = ({kingdomId,code}) => {
        if (!kingdomId) throw new Error(LocationRepo.errorMessages.missingKingdomId);
        if (!code) throw new Error(LocationRepo.errorMessages.missingCode);
        if (code.length < 3) throw new Error(LocationRepo.errorMessages.invalidCode);
    };

    async add({kingdomId,code}) {
        this.validateParams({kingdomId,code});
        const query = this.validateQuery`INSERT INTO locations (kingdom_id,code) VALUES(${kingdomId},${code})`;
        return await (this.sendQuery(query));
    };

};
