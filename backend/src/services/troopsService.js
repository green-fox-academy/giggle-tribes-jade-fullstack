import { getTroopsForKingdom, insertTroopForKingdom } from '../repos/troops';
import { resourceService } from './resourceService';

const setMinutes = async (startTime, minutes) => {
  console.log(startTime);
  return startTime.setUTCMinutes(startTime.getUTCMinutes() + minutes);
};

export const troopsService = {
  async getTroops({ kingdomID }) {
    if (kingdomID) {
      const troops = await getTroopsForKingdom(kingdomID);
      return troops;
    } else {
      throw { error: 'Kingdom ID is required.' };
    }
  },

  async addTroop({ kingdomID }) {
    const currentTime = new Date();
    const startTime = new Date();
    await setMinutes(currentTime, 1);
    const endTime = currentTime;

    const level = 1;
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
    console.log(troops);
    if (goldAmount >= 10 && troopLimit > troops.length) {
      const troop = await insertTroopForKingdom(
        1,
        level,
        level,
        level,
        level,
        startTime,
        endTime
      );
      console.log(troop);
      return {
        id: troop.insertId,
        level: level,
        hp: level,
        attack: level,
        defence: level,
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
