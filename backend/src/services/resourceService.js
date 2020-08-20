import {
  getResourceForKingdom,
  updateResourceForKingdom,
  insertResourceForKingdom
} from '../repos/resource';
import { resourceRepo } from '../repos/resourceRepo';

const calculateTimeDifference = updatedAt => {
  const currentTime = new Date();
  const timeDifferenceInMinutes = Math.floor((currentTime - updatedAt) / 60000);

  return timeDifferenceInMinutes;
};

const calculateNewAmount = (currentAmount, generation, updatedAt) => {
  const newAmount =
    currentAmount + (calculateTimeDifference(updatedAt)) * generation;
  return newAmount;
};

const getResource = async ({ kingdomID }) => {
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
};

const createResource = async ({ kingdomID }) => {
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
};

const getResourcesByKingdomId = async (kingdomId) => {
  if(!kingdomId) throw new Error ('KingdomId is required.');
  const resources = await getResourceForKingdom(kingdomId);
  if (resources.length === 0) throw new Error ('UpdateResource failed. Resource for this kingdom not found.');
  return resources;
};

const generateResources = async (kingdomId) => {
  const resources = await getResourcesByKingdomId(kingdomId);
  resources.forEach( async resource => {
    const updateAmount = calculateNewAmount(resource.amount, resource.generation, resource.updatedAt);
    const changedRows = (await resourceRepo.updateResource({amount: updateAmount, generation: resource.generation, kingdom_id : kingdomId, type : resource.type}) ).changedRows;
    if (changedRows === 0) throw new Error('Data not found.');
  });
};

const resourceUpdateFactory = async (kingdomId,resourceType) => {
  const resources = await getResourcesByKingdomId(kingdomId);
  const resourceByType = {};
  resources.forEach( resource => {
    resourceByType[resource.type] = {
      amount: resource.amount,
      generation: resource.generation
    }
  });
  const {amount,generation} = resourceByType[resourceType];
  return async function (changeAmount,changeGeneration) {
    const changedRows = (await resourceRepo.updateResource({amount: amount + changeAmount, generation: generation + changeGeneration, kingdom_id : kingdomId, type : resourceType}) ).changedRows;
    if (changedRows === 0) throw new Error('Data not found.');
  };
};

const spendGold = async (kingdomId,amount) => {
  await (await resourceUpdateFactory(kingdomId,'gold'))(-amount,0);
};

const spendFood= async (kingdomId,amount) => {
  await (await resourceUpdateFactory(kingdomId,'food'))(-amount,0);
};

const updateGoldGeneration = async (kingdomId,generation) => {
  await (await resourceUpdateFactory(kingdomId,'gold'))(0,generation);
};

const updateFoodGeneration = async (kingdomId,generation) => {
  await (await resourceUpdateFactory(kingdomId,'food'))(0,generation);
};

export const resourceService = {
  getResource,
  createResource,
  generateResources,
  spendGold,
  spendFood,
  updateGoldGeneration,
  updateFoodGeneration
};

