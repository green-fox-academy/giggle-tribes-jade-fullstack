import { db } from '../data/connection';

class TroopsRepo {
  async get(kingdomID) {
    console.log('repo');
    console.log(kingdomID);
    const troops = await db.query(
      `select * from kingdom_troops where kingdom_id = ?;`,
      kingdomID
    );
    return troops.results;
  }

  async insert(kingdomID, level, hp, attack, defence, started_at, finished_at) {
    const troop = await db.query(
      `insert into kingdom_troops (kingdom_id, level, hp, attack, defence, started_at, finished_at) values(?,?,?,?,?,?,?);`,
      [kingdomID, level, hp, attack, defence, started_at, finished_at]
    );
    return troop.results;
  }

  async update(kingdomID, level, hp, attack, defence, started_at, finished_at) {
    const troop = await db.query(
      `update kingdom_troops set level=?, hp=?, attack=?, defence=?, started_at=?, finished_at=? where kingdom_id=? LIMIT 1;`,
      [level, hp, attack, defence, started_at, finished_at, kingdomID]
    );
    return troop.results;
  }
}

export const troopsRepo = new TroopsRepo();
