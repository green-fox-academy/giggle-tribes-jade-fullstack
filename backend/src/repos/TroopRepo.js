import QueryHandler from './QueryHandler';

export class TroopRepo extends QueryHandler {

    constructor(db,errorCodes) {
        super(db,errorCodes);
    };

    async add({kingdomId,level,hp,attack,defence,started_at,finished_at}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const query = this.validateQuery`
            INSERT INTO kingdom_troops
            (kingdom_id,level,hp,attack,defence,started_at,finished_at) 
            VALUES(${kingdomId},${level},${hp},${attack},${defence},${started_at},${finished_at})
        `;
        return await (this.sendQuery(query));
    };

    async getByKingdomId({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const query = this.validateQuery`SELECT * FROM kingdom_troops WHERE kingdom_id = ${kingdomId}`;
        return await (this.sendQuery(query));
    };

    async update({troopId,level,hp,attack,defence,started_at,finished_at}) {
        if (!troopId) throw new Error(this.errorCodes.missingTroopId);
        const query = this.validateQuery`
            UPDATE kingdom_troops
            SET level=${level}, hp=${hp}, attack=${attack}, defence=${defence},
            started_at=${started_at}, finished_at=${finished_at}
            WHERE id=${troopId}
        `;
        return await (this.sendQuery(query));
    };

};
