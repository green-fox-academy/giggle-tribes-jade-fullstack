import { troopsRepo } from '../repos/TroopsRepo';
import { resourceService } from '../services/resourceService';

export class TroopsService {
  constructor({ resourceService, troopsRepo }) {
    this.getTroopsByKingdom = troopsRepo.get;
    this.resourceService = resourceService;
    this.insertTroopByKingdom = troopsRepo.insert;
    this.setMinutes = async (startTime, minutes) => {
      return startTime.setUTCMinutes(startTime.getUTCMinutes() + minutes);
    };
  }
  async getTroops({ kingdomID }) {
    if (kingdomID) {
      const troops = await this.getTroopsByKingdom(kingdomID);
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

    const troops = await this.getTroopsByKingdom(kingdomID);

    if (goldAmount >= rules.troopCost && rules.troopLimit > troops.length) {
      const currentTime = new Date();
      const startTime = new Date();
      await this.setMinutes(currentTime, rules.creatingTime);
      const endTime = currentTime;

      const troop = await this.insertTroopByKingdom(
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

export const troopsService = new TroopsService({
  troopsRepo,
  resourceService,
});
