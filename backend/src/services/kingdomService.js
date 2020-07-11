import { repo } from '../repos/repoHandler';

const returnObject = {
    "id" : 1,
    "name" : "London",
    "userId" : 1,
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
      "country_code": "ENG"
    }
  };

const prepareReturn = (input,data) => {
    returnObject.id = input.kingdomId;
    returnObject.name = data.kingdomname;
    returnObject.userId = data.userid;
    returnObject.location.country_code = input.countryCode;
};

const add = (input) => {
    return new Promise( async (resolve,reject) => {
        try {
            await repo.read('kingdomNullLocation', {'kingdom_id' : input.kingdomId});
            const kingdomBase = (await repo.read('kingdomBaseData', {'kingdom_id' : input.kingdomId}));
            console.log(kingdomBase)
            await repo.save('location', {'kingdomid' : input.kingdomId, 'code' : input.countryCode});
            prepareReturn(input,kingdomBase);
            resolve(returnObject);
        } catch(error) {
            if (error.duplication) reject('Location is already occupied.');
            if (error.validationError) reject(error.validationError);
            reject(error);
        }
    });
};

export const kingdomService = {
    add
};
