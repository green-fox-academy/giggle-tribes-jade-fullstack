import { troopsRepo } from '../repos/TroopsRepo';
import { resourceService } from '../services/resourceService';

export class TroopsService {
  constructor({ resourceService, troopsRepo }) {
    this.tableName = troopsRepo.tableName;
    this.columns = troopsRepo.columns;
    this.getTroopsByKingdom = troopsRepo.get;
    this.resourceService = resourceService;
    this.insertTroopByKingdom = troopsRepo.insert;
    this.updateTroopsByKingdom = troopsRepo.update;
    this.setMinutes = async (startTime, minutes) => {
      startTime.setUTCMinutes(startTime.getUTCMinutes() + minutes);

      return startTime;
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
    const goldAmount = await (
      await (await this.resourceService.getResource({ kingdomID })).resources
    ).find(resource => resource.type === 'gold').amount;
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

  async upgradeTroops({ kingdomID, amount, level }) {
    const rules = {
      upgradeCost: 10,
      academyLevel: 2, //BuildingService.get find building.type === 'academy' return building.level
      upgradeableTroopAmount: await (
        await this.getTroopsByKingdom(kingdomID)
      ).filter(troop => troop.level == level).length,
      upgradeTime: 1 + level * 0.5,
    };

    if (level && amount) {
      const goldAmount = await (
        await (await this.resourceService.getResource({ kingdomID })).resources
      ).find(resource => resource.type === 'gold').amount;
      if (
        rules.upgradeCost <= goldAmount &&
        level < rules.academyLevel &&
        amount <= rules.upgradeableTroopAmount
      ) {
        const startTime = new Date();
        const endTime = await this.setMinutes(new Date(), rules.upgradeTime);
        const newValues = parseInt(level) + 1;

        const result = await this.updateTroopsByKingdom(
          kingdomID,
          amount,
          level,
          newValues,
          newValues,
          newValues,
          newValues,
          startTime,
          endTime
        );
        if (result.changedRows === 0) throw new Error('Data not found.');
        this.resourceService.spendGold(kingdomID, rules.upgradeCost);
        const troops = await this.getTroopsByKingdom(kingdomID);
        return { troops };
      } else if (rules.upgradeCost > goldAmount) {
        throw { error: "You don't have enough money." };
      } else if (level >= rules.academyLevel) {
        throw { error: 'Upgrade is not allowed, academy level too low.' };
      } else {
        throw {
          error: `Amount was too much, you have ${rules.upgradeableTroopAmount} troops in that troop level.`,
        };
      }
    } else if (!level) {
      throw { error: 'Troop level is required.' };
    } else {
      throw { error: 'Amount is required.' };
    }
  }
}

export const troopsService = new TroopsService({
  troopsRepo,
  resourceService,
});
