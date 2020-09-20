import { ResourceSpender } from './ResourceSpender';

export class TroopService extends ResourceSpender {
  constructor({ troopRepo, resourceService, buildingService, errorCodes }) {
    super({ resourceService, errorCodes });
    this.troop = troopRepo;
    this.building = buildingService;
    this.troopData = {};
    this.troopStats = {
      addTime: 60000,
      upgradeTime: 30000,
      limit: null,
    };
    this.resourceStats = {
      troop: { cost: 10, res: 'food', gen: -1 },
    };
  }

  setTroopData({ kingdomId, level, upgrade }) {
    const duration = upgrade
      ? this.troopStats.addTime + this.troopStats.upgradeTime * level
      : this.troopStats.addTime;
    const start = new Date();
    const finish = new Date(start.getTime() + duration);
    this.troopData = {
      id: null,
      kingdom_id: kingdomId,
      level: level,
      hp: level,
      attack: level,
      defence: level,
      started_at: start.toLocaleString(),
      finished_at: finish.toLocaleString(),
    };
  }

  async getByKingdomId({ kingdomId }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
    const troops = await this.troop.getByKingdomId({ kingdomId });
    return { troops };
  }

  async add({ kingdomId }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);

    await this.setResources(kingdomId, 'troop');

    const troopsNumber = (await this.getByKingdomId({ kingdomId })).troops
      .length;
    this.troopStats.limit =
      (await this.building.getByKingdomId({ kingdomId })).buildings.find(
        building => building.type === 'townhall'
      ).level * 100;
    if (troopsNumber >= this.troopStats.limit)
      throw new Error(this.errorCodes.invalidAddLimit);

    this.setTroopData({ kingdomId, level: 1 });
    this.troopData.id = (await this.troop.add(this.troopData)).insertId;

    await this.spendResources();

    return this.troopData;
  }

  async upgrade({ kingdomId, level, amount }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);

    if (!level) throw new Error(this.errorCodes.missingTroopLevel);

    if (!amount) throw new Error(this.errorCodes.missingTroopAmount);

    this.resourceStats.troop.cost *= amount;

    await this.setResources(kingdomId, 'troop');

    this.troopStats.limit = (
      await this.building.getByKingdomId({ kingdomId })
    ).buildings.find(building => building.type === 'academy').level;

    if (level >= this.troopStats.limit)
      throw new Error(this.errorCodes.invalidUpdateLimit);

    const upgradebleTroops = (
      await this.getByKingdomId({ kingdomId })
    ).troops.filter(troop => troop.level == level);
    if (upgradebleTroops.length < amount)
      throw new Error(this.errorCodes.invalidTroopAmount);

    this.setTroopData({ kingdomId, level: parseInt(level) + 1, upgrade: true });

    for (let i = 0; i < amount; i++) {
      if (i === 0) this.troopData.id = [];
      this.troopData.id.push(upgradebleTroops[i].id);
    }

    await this.troop.update(this.troopData);
    await this.spendResources();

    return await this.getByKingdomId({ kingdomId });
  }
}
