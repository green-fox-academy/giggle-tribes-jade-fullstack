import { kingdomService } from './kingdomService';
jest.mock('../repos/repoHandler');
import { repo } from '../repos/repoHandler';


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
class ValidationError extends Error {
  constructor(field) {
    super();
    this.validationError = `The proper data was not provided.`;
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
  repo.read.mockImplementation( () => {
    return {'userid' : 1, 'kingdomname' : 'London'}
  });
  const result = await kingdomService.add(input);
  expect(result).toStrictEqual(returnObject);
});

test('kingdom id doesnt match', async () => {
  repo.read.mockImplementation( () => {
    throw new ValidationError();
  });
  try {
    await kingdomService.add(input);
  } catch(err) {
    expect(err).toBe('Invalid kingdom id.');
  }
});

test('existing location error', async () => {
  repo.read.mockImplementation( () => {
    return {'userid' : 1, 'kingdomname' : 'London'}
  });
  repo.save.mockImplementation( () => {
    throw new ExistingLocationError();
  });
  try {
    await kingdomService.add(input);
  } catch(err) {
    expect(err).toBe('Location is already occupied.');
  }
});
