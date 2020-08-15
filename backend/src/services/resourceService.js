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

const updateResourceByType = async (kingdomId, cost, genAdd, {type, amount, generation, updatedAt}) => {
  const updateAmount = (cost !== null) ? amount - cost : calculateNewAmount(amount, generation, updatedAt);
  const updateGeneration = genAdd ? generation + genAdd : generation;
  const changedRows = (await resourceRepo.updateResource({amount: updateAmount, generation: updateGeneration, kingdom_id : kingdomId, type : type}) ).changedRows;
  if (changedRows === 0) throw new Error('Data not found.');
};

const typeParams = (kingdomId, cost, genAdd, resources) => ({
  '-': [
    [ kingdomId, cost, 0, resources.find(e => e.type === 'gold') ]
  ],
  'gold': [
    [ kingdomId, cost, genAdd, resources.find(e => e.type === 'gold') ]
  ],
  'food': [
    [ kingdomId, cost, 0, resources.find(e => e.type === 'gold') ],
    [ kingdomId, 0, genAdd, resources.find(e => e.type === 'food') ]
  ],
  'default': [
    [ kingdomId, null, 0, resources.find(e => e.type === 'gold') ],
    [ kingdomId, null, 0, resources.find(e => e.type === 'food') ]
  ]
});

const updateResource = async (kingdomId,{cost,genAdd,genType}) => {
  if(!kingdomId) throw new Error ('KingdomId is required.');
  const resources = await getResourceForKingdom(kingdomId);
  if (resources.length === 0) throw new Error ('UpdateResource failed. Resource for this kingdom not found.');
  const type = genType ? genType : 'default';
  typeParams(kingdomId, cost, genAdd, resources)[type].forEach( async params => await updateResourceByType(...params) );
};


export const resourceService = {
  getResource,
  updateResource,
  createResource
}
