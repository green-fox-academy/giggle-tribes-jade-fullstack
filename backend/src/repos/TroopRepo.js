import QueryHandler from './QueryHandler';

export class TroopRepo extends QueryHandler {

    constructor(db,errorCodes) {
        super(db,errorCodes);
    };

    async add({kingdomId,level,hp,attack,defence,started_at,finished_at}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const query = this.validateQuery`
<<<<<<< HEAD
            INSERT INTO troops
=======
            INSERT INTO kingdom_troops
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
            (kingdom_id,level,hp,attack,defence,started_at,finished_at) 
            VALUES(${kingdomId},${level},${hp},${attack},${defence},${started_at},${finished_at})
        `;
        return await (this.sendQuery(query));
    };

    async getByKingdomId({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
<<<<<<< HEAD
        const query = this.validateQuery`SELECT * FROM troops WHERE kingdom_id = ${kingdomId}`;
=======
        const query = this.validateQuery`SELECT * FROM kingdom_troops WHERE kingdom_id = ${kingdomId}`;
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
        return await (this.sendQuery(query));
    };

    async update({troopId,level,hp,attack,defence,started_at,finished_at}) {
        if (!troopId) throw new Error(this.errorCodes.missingTroopId);
        const query = this.validateQuery`
<<<<<<< HEAD
            UPDATE troops
=======
            UPDATE kingdom_troops
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
            SET level=${level}, hp=${hp}, attack=${attack}, defence=${defence},
            started_at=${started_at}, finished_at=${finished_at}
            WHERE id=${troopId}
        `;
        return await (this.sendQuery(query));
    };

};
