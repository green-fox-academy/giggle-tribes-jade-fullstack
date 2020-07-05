import {
  getResourceForKingdom,
  insertResourceForKingdom,
} from '../repos/resource';

export const resourceService = {
  async getResource(input) {
    const kingdomID = input.kingdomID;

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

  async createResource(input) {
    const kingdomID = input.kingdomID;

    if (kingdomID) {
      const resourceForKingdomID = await getResourceForKingdom(kingdomID);

      if (resourceForKingdomID.length === 0) {
        const food = await insertResourceForKingdom(kingdomID, 'food', 500, 1);
        const gold = await insertResourceForKingdom(kingdomID, 'gold', 500, 1);
        if (gold.insertId && food.insertId) {
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
            throw { error: 'InsertResource failed. Kingdom ID not found.' };
          }
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
