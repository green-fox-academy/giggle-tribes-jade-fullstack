import { kingdomRepo } from '../repos/kingdomRepo';
import { locationRepo } from '../repos/locationRepo';

const returnObject = (input,data) => ({
    "id" : input.kingdomId,
    "name" : data.kingdomname,
    "userId" : data.userid,
    "buildings": [
      {
        "id" : 1,
        "type" : "townhall",
        "level": 1,
        "hp": 1,
        "started_at": 12345789,
        "finished_at": 12399999
      }
    ],
    "resources": [
      {
        "type" : "food",
        "amount": 1,
        "generation": 1
      },
      {
        "type" : "gold",
        "amount": 1,
        "generation": 1
      }
    ],
    "troops": [
      {
        "id": 1,
        "level": 1,
        "hp": 1,
        "attack": 1,
        "defence": 1,
        "started_at": 12345789,
        "finished_at": 12399999
      }
    ],
    "location": {
      "country_code": input.countryCode
    }
  });

  
const isKingdomLocated = async (input) => {
  const isLocated = await kingdomRepo.get('kingdomNullLocation', {'kingdom_id' : input.kingdomId});
  if ( isLocated.length === 0 ) throw new Error('located');
};

const add = async (input) => {
  try {
    await isKingdomLocated(input);
    const kingdomBase = (await kingdomRepo.get('kingdomBaseData', {'kingdom_id' : input.kingdomId}));
    await locationRepo.add({'kingdomid' : input.kingdomId, 'code' : input.countryCode});
    return returnObject(input,kingdomBase);
  } catch(error) {
      if (error.message === 'located') return {error: 'Invalid kingdom id.'};
      if (error.duplication) return {error: 'Location is already occupied.'};
      return error;
  }
};

const get = async () => {
  try {
    const kingdomsData = (await kingdomRepo.get('kingdomsData', {}));
    return { kingdoms : kingdomsData };
  } catch(error) {
    if (error.validationError) return {error: 'No data.'};
    return error;
  }
};

export const kingdomService = {
    add,
    get
};
