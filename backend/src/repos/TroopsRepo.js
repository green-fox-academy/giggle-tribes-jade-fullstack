import { db } from '../data/connection';
import { getColumnNames } from './getColumnNames';

class TroopsRepo {
  constructor() {
    this.getColumnNames = getColumnNames;
  }
  async get(kingdomID) {
    const troops = await db.query(
      `select * from kingdom_troops where kingdom_id = ?;`,
      kingdomID
    );

    return troops.results;
  }

  async insert(kingdomID, level, hp, attack, defence, started_at, finished_at) {
    const columns = await (await this.getColumnNames('kingdom_troops')).slice(
      1
    );
    const troop = await db.query(
      `insert into kingdom_troops (${columns}) values(?,?,?,?,?,?,?);`,
      [kingdomID, level, hp, attack, defence, started_at, finished_at]
    );
    return troop.results;
  }

  async update(kingdomID, level, started_at, finished_at) {
    const columns = await this.getColumnNames('kingdom_troops');
    const troop = await db.query(
      `update kingdom_troops set ${columns[2]} = ${columns[2]} + 1, ${columns[3]} = ${columns[3]} + 1, ${columns[4]} = ${columns[4]} + 1, ${columns[5]} = ?, ${columns[6]}=?, ${columns[7]}=? where ${columns[1]} = ? and ${columns[2]} = ? LIMIT 1;`,
      [started_at, finished_at, kingdomID, level]
    );
    return troop.results;
  }
}

export const troopsRepo = new TroopsRepo();
