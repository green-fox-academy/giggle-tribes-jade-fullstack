import { getTroopsForKingdom, insertTroopForKingdom } from '../repos/troops';
import { resourceService } from './resourceService';

const setMinutes = async (startTime, minutes) => {
  return startTime.setUTCMinutes(startTime.getUTCMinutes() + minutes);
};

export const troopsService = {
  async getTroops({ kingdomID }) {
    if (kingdomID) {
      const troops = await getTroopsForKingdom(kingdomID);
      return { troops: troops };
    } else {
      throw { error: 'Kingdom ID is required.' };
    }
  },

  async addTroop({ kingdomID }) {
    let goldAmount;
    const resources = await (await resourceService.getResource({ kingdomID }))
      .resources;
    resources.map(resource => {
      if (resource.type === 'gold') {
        goldAmount = resource.amount;
      }
    });
    const troopLimit = 100; //need logic for building repo
    const troops = await getTroopsForKingdom(kingdomID);

    if (goldAmount >= 10 && troopLimit > troops.troops.length) {
      const currentTime = new Date();
      const startTime = new Date();
      await setMinutes(currentTime, 1);
      const endTime = currentTime;

      const troop = await insertTroopForKingdom(
        kingdomID,
        1,
        1,
        1,
        1,
        startTime,
        endTime
      );
      console.log(troop);
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
  },
};
