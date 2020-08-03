import {
  getResourceForKingdom,
  updateResourceForKingdom,
  insertResourceForKingdom
} from '../repos/resource';
import { resourceRepo } from '../repos/resourceRepo';

const calculateTimeDifference = async updatedAt => {
  const currentTime = new Date();
  const timeDifferenceInMinutes = Math.floor((currentTime - updatedAt) / 60000);

  return timeDifferenceInMinutes;
};

const calculateNewAmount = async (currentAmount, generation, updatedAt) => {
  const newAmount =
    currentAmount + (await calculateTimeDifference(updatedAt)) * generation;
  return newAmount;
};

export const resourceService = {
  async getResource({ kingdomID }) {
    if (kingdomID) {
      const resource = await getResourceForKingdom(kingdomID);
      if (resource.length > 0) {
        return {
          resources: [
            {
              type: resource[0].type,
              amount: resource[0].amount,
              generation: resource[0].generation,
              updatedAt: resource[0].updatedAt,
            },
            {
              type: resource[1].type,
              amount: resource[1].amount,
              generation: resource[1].generation,
              updatedAt: resource[1].updatedAt,
            },
          ],
        };
      } else {
        throw { error: 'GetResource failed. Kingdom ID not found.' };
      }
    } else {
      throw { error: 'Kingdom ID is required.' };
    }
  },

  async updateResource({ kingdomID, currentGeneration, buildingCost }) {
    if (kingdomID) {
      const resources = await getResourceForKingdom(kingdomID);
      if (resources.length > 0) {
        await Promise.all(
          resources.map(async resource => {
            const amount = buildingCost
              ? resource.type === 'gold'
                ? resource.amount - buildingCost
                : resource.amount
              : resource.amount;
            const generation = currentGeneration
              ? currentGeneration
              : resource.generation;
            const newAmount = await calculateNewAmount(
              amount,
              generation,
              resource.updatedAt
            );

            await updateResourceForKingdom(
              kingdomID,
              resource.type,
              newAmount,
              generation
            );
          })
        );
      } else {
        throw {
          error: 'UpdateResource failed. Resource for this kingdom not found.',
        };
      }
    } else {
      throw { error: 'Kingdom ID is required.' };
    }
  },

  async createResource({ kingdomID }) {
    if (kingdomID) {
      const resourceForKingdomID = await getResourceForKingdom(kingdomID);

      if (resourceForKingdomID.length === 0) {
        const food = await insertResourceForKingdom(kingdomID, 'food', 500, 0);
        const gold = await insertResourceForKingdom(kingdomID, 'gold', 500, 0);
        if (gold.insertId && food.insertId) {
          return { message: 'InsertResource successful' };
        } else {
          throw { error: 'InsertResource failed.' };
        }
      } else {
        throw {
          error:
            'InsertResource stopped. Resource for this Kingdom ID already exists.',
        };
      }
    } else {
      throw { error: 'Kingdom ID is required.' };
    }
  },
};


export const updateAmount = async (input) => {
  const changedRows = (await resourceRepo.updateAmount({'amount' : input.amount, 'kingdom_id' : input.kingdomId, 'type' : input.type}) ).changedRows;
  if (changedRows === 0) throw new Error('Data not found.');
};
