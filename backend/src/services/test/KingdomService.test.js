import { KingdomService } from '../../services';
import { errorCodes } from '../../repos';

const db = {};

class LocationRepo {
  async add({kingdomId,locationCode}) {
    return [{}];
  };
};

class BuildingRepo {
  async getById({kingdomId}) {
    return [
      {
        id: 1,
        kingdomId: kingdomId,
        type: 'academy',
        level: 1,
        hp: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22'
      },
      {
        id: 2,
        kingdomId: kingdomId,
        type: 'farm',
        level: 4,
        hp: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22'
      },
  ];
  };
};

class ResourceRepo {
  async getById({kingdomId}) {
    return [
      {
        id: 1,
        kingdomId: kingdomId,
        type: 'gold',
        amount: 100,
        generation: 5,
        updatedAt: '2020-08-19 19:06:22'
      },
      {
        id: 2,
        kingdomId: kingdomId,
        type: 'food',
        amount: 200,
        generation: 10,
        updatedAt: '2020-08-19 19:06:22'
      },
  ];
  };
};

class KingdomRepo {
  getById({kingdomId}) {
    return [{
        kingdomId: kingdomId,
        kingdomName: 'firstKingdom',
        userId: 2,
        location: null
    }];
  };
  async get() {
    return [
      {
        kingdomId: 1,
        kingdomName: 'firstKingdom',
        location: 'ABC'
      },
      {
        kingdomId: 2,
        kingdomName: 'secondKingdom',
        location: 'DEF'
      },
  ];
  };
};

const kingdom = new KingdomService({KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});

test('add: valid userdata returns valid result', async () => {
  const result = await kingdom.attachLocation({kingdomId: 13, locationCode: 'TST'}); 
  expect(result).toStrictEqual({
    id: 13,
    name: 'firstKingdom',
    userId: 2,
    buildings: [
      {
        "finished_at": "2020-08-19 19:06:22",
        "hp": 1,
        "id": 1,
        "kingdomId": 13,
        "level": 1,
        "started_at": "2020-08-19 19:06:22",
        "type": "academy"
      },
      {
        "finished_at": "2020-08-19 19:06:22",
        "hp": 1,
        "id": 2,
        "kingdomId": 13,
        "level": 4,
        "started_at": "2020-08-19 19:06:22",
        "type": "farm",
      }
    ],
    resources: [
      {
        "amount": 100,
        "generation": 5,
        "type": "gold",
      },
      {
        "amount": 200,
        "generation": 10,
        "type": "food",
      }
    ],
    troops: [],
    location: { "country_code": "TST" }
  });
});

