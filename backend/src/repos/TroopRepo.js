import QueryHandler from './QueryHandler';
import { Troop } from './Troop';

export class TroopRepo extends QueryHandler {
  constructor(db, errorCodes) {
    super(db, errorCodes);
  }

  async add({
    kingdom_id,
    level,
    hp,
    attack,
    defence,
    started_at,
    finished_at,
  }) {
    if (!kingdom_id) throw new Error(this.errorCodes.missingKingdomId);
    const query = this.validateQuery`
            INSERT INTO kingdom_troops
            (kingdom_id,level,hp,attack,defence,started_at,finished_at) 
            VALUES(${kingdom_id},${level},${hp},${attack},${defence},${started_at},${finished_at})
        `;
    return await this.sendQuery(query);
  }

  async getByKingdomId({ kingdomId }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
    const query = this
      .validateQuery`SELECT * FROM kingdom_troops WHERE kingdom_id = ${kingdomId}`;

    return (await this.sendQuery(query)).map(
      troop =>
        new Troop(
          troop.id,
          troop.kingdom_id,
          troop.level,
          troop.hp,
          troop.attack,
          troop.defence,
          troop.started_at,
          troop.finished_at
        )
    );
  }

  async update({ level, hp, attack, defence, started_at, finished_at }, ids) {
    if (ids.length === 0) throw new Error(this.errorCodes.missingTroopId);
    const query = this.validateQuery`
            UPDATE kingdom_troops
            SET level=${level}, hp=${hp}, attack=${attack}, defence=${defence},
            started_at=${started_at}, finished_at=${finished_at}
            WHERE id IN (${ids})
        `;

    return await this.sendQuery(query);
  }
}
