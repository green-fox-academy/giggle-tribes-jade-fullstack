import QueryHandler from './QueryHandler';

export class BuildingRepo extends QueryHandler {

    static errorMessages = {
        missingKingdomId: 2
    };

    constructor(db) {
        super(db);
    };

    async add({kingdomId,type,level,hp,started_at,finished_at}) {
        if (!kingdomId) throw new Error(BuildingRepo.errorMessages.missingKingdomId);
        const query = this.validateQuery`
            INSERT INTO buildings 
            (kingdom_id,type,level,hp,started_at,finished_at) 
            VALUES(${kingdomId},${type},${level},${hp},${started_at},${finished_at})
        `;
        return await (this.sendQuery(query));
    };

};
