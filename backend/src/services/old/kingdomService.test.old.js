import { kingdomService } from './kingdomService';
jest.mock('../repos/locationRepo');
jest.mock('../repos/kingdomRepo');
import { locationRepo } from '../repos/locationRepo';
import { kingdomRepo } from '../repos/kingdomRepo';


const input = {
  kingdomId: 1,
  countryCode: "ENG"
};

class ExistingLocationError extends Error {
  constructor() {
    super();
    this.duplication = true;
  }
};

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

test('location set for kingdom', async () => {
  kingdomRepo.getKingdomNullLocation.mockImplementation( () => {
    return {'kingdomid' : 1, 'locationid' : null}
  });
  kingdomRepo.getKingdomBaseData.mockImplementation( () => {
    return {'userid' : 1, 'kingdomname' : 'London'}
  });
  locationRepo.add.mockImplementation( () => 0 );
  const result = await kingdomService.add(input);
  expect(result).toStrictEqual(returnObject);
});

test('kingdom id doesnt match', async () => {
  kingdomRepo.getKingdomNullLocation.mockImplementation( () => [] );
  kingdomRepo.getKingdomBaseData.mockImplementation( () => {
    return {'userid' : 1, 'kingdomname' : 'London'}
  });
  try {
    await kingdomService.add(input);
  } catch(err) {
    expect(err).toBe('Invalid kingdom id.');
  }
});

test('existing location error', async () => {
  kingdomRepo.getKingdomNullLocation.mockImplementation( () => [] );
  kingdomRepo.getKingdomBaseData.mockImplementation( () => {
    return {'userid' : 1, 'kingdomname' : 'London'}
  });
  locationRepo.add.mockImplementation( () => {
    throw new ExistingLocationError();
  });
  try {
    await kingdomService.add(input);
  } catch(err) {
    expect(err).toBe('Location is already occupied.');
  }
});

test('getting kingdom data', async () => {
  kingdomRepo.getKingdomsData.mockImplementation( () => {
    return [{
      "kingdom_id": 3,
      "kingdomname": "Dependency Injection",
      "population": 1,
      "location": "ENG"
   }]
  });
  const result = await kingdomService.get();
  expect(result).toStrictEqual({
    "kingdoms": [
        {
            "kingdom_id": 3,
            "kingdomname": "Dependency Injection",
            "population": 1,
            "location": "ENG"
        }
    ]
  });
});
