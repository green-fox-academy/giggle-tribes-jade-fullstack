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
    const troopLimit = 100; //need logic for building repo
    const troops = await this.getTroopsForKingdom(kingdomID);

    if (goldAmount >= 10 && troopLimit > troops.length) {
      const currentTime = new Date();
      const startTime = new Date();
      await setMinutes(currentTime, 1);
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

      return {
        id: troop.insertId,
        level: 1,
        hp: 1,
        attack: 1,
        defence: 1,
        started_at: startTime,
        finished_at: endTime,
      };
    } else if (goldAmount < 10) {
      throw { error: "You don't have enough money." };
    } else {
      throw { error: 'You reached the storage limit, upgrade Townhall first.' };
    }
  }
}
