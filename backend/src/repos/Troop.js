export class Troop {
  constructor(
    id,
    kingdom_id,
    level,
    hp,
    attack,
    defence,
    started_at,
    finished_at
  ) {
    this.id = id;
    this.kingdom_id = kingdom_id;
    this.level = level;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
    this.started_at = started_at;
    this.finished_at = finished_at;
  }
}
