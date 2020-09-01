import { db } from '../data/connection';

class TroopsRepo {
  constructor() {
    this.tableName = 'kingdom_troops';
    this.columns = {
      id: 'id',
      kingdom_id: 'kingdom_id',
      level: 'level',
      hp: 'hp',
      attack: 'attack',
      defence: 'defence',
      started_at: 'started_at',
      finished_at: 'finished_at',
    };
  }
  async get(kingdomID) {
    const troops = await db.query(
      `select * from ${this.tableName} where ${this.columns.kingdom_id} = ?;`,
      kingdomID
    );

    return troops.results;
  }

  async insert(kingdomID, level, hp, attack, defence, started_at, finished_at) {
    const troop = await db.query(
      `insert into ${this.tableName} (${[
        this.columns.kingdom_id,
        this.columns.level,
        this.columns.hp,
        this.columns.attack,
        this.columns.defence,
        this.columns.started_at,
        this.columns.finished_at,
      ]}) values(?,?,?,?,?,?,?);`,
      [kingdomID, level, hp, attack, defence, started_at, finished_at]
    );
    return troop.results;
  }

  async update(troopId, level, hp, attack, defence, started_at, finished_at) {
    const troop = await db.query(
      `update ${this.tableName} set ${this.columns.level}=?, ${this.columns.hp}=?, ${this.columns.attack}=?, ${this.columns.defence}=?, ${this.columns.started_at}=?, ${this.columns.finished_at}=? where ${this.columns.id} = ?  LIMIT 1;`,
      [level, hp, attack, defence, started_at, finished_at, troopId]
    );
    return troop.results;
  }
}

export const troopsRepo = new TroopsRepo();
