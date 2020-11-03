import QueryHandler from './QueryHandler';

export class BuildingRepo extends QueryHandler {
  constructor(db, errorCodes) {
    super(db, errorCodes);
  }

  async add({ kingdomId, type, level, hp, started_at, finished_at }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
    const query = this.validateQuery`
            INSERT INTO buildings 
            (kingdom_id,type,level,hp,started_at,finished_at) 
            VALUES(${kingdomId},${type},${level},${hp},${started_at},${finished_at})
        `;
    return await this.sendQuery(query);
  }

  async getByKingdomId({ kingdomId }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
    const query = this
      .validateQuery`SELECT * FROM buildings WHERE kingdom_id = ${kingdomId}`;
    return await this.sendQuery(query);
  }
}
