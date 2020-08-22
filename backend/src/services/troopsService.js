const setMinutes = async (startTime, minutes) => {
  return startTime.setUTCMinutes(startTime.getUTCMinutes() + minutes);
};

export class TroopsService {
  constructor({ resourceService, getTroopsForKingdom, insertTroopForKingdom }) {
    this.getTroopsForKingdom = getTroopsForKingdom;
    this.resourceService = resourceService;
    this.insertTroopForKingdom = insertTroopForKingdom;
  }
  async getTroops({ kingdomID }) {
    if (kingdomID) {
      const troops = await this.getTroopsForKingdom(kingdomID);
      return { troops: troops };
    } else {
      throw { error: 'Kingdom ID is required.' };
    }
  }

  async addTroop({ kingdomID }) {
    let goldAmount;
    const resources = await this.resourceService.getResource({ kingdomID });
    await resources.resources.map(resource => {
      if (resource.type === 'gold') {
        goldAmount = resource.amount;
      }
    });
    const rules = {
      troopLimit: 100, //need logic for building repo
      troopCost: 10,
      creatingTime: 1,
      foodConsumption: -1,
    };

    const troops = await this.getTroopsForKingdom(kingdomID);

    if (goldAmount >= rules.troopCost && rules.troopLimit > troops.length) {
      const currentTime = new Date();
      const startTime = new Date();
      await setMinutes(currentTime, rules.creatingTime);
      const endTime = currentTime;

      const troop = await this.insertTroopForKingdom(
        kingdomID,
        1,
        1,
        1,
        1,
        startTime,
        endTime
      );
      if (troops.changedRows === 0) throw new Error('Data not found.');
      this.resourceService.spendGold(kingdomID, rules.troopCost);
      this.resourceService.updateFoodGeneration(
        kingdomID,
        rules.foodConsumption
      );

      return {
        id: troop.insertId,
        level: 1,
        hp: 1,
        attack: 1,
        defence: 1,
        started_at: startTime,
        finished_at: endTime,
      };
    } else if (goldAmount < rules.troopCost) {
      throw { error: "You don't have enough money." };
    } else {
      throw { error: 'You reached the storage limit, upgrade Townhall first.' };
    }
  }
}
