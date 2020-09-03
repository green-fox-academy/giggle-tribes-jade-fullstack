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

class KingdomRepo_notnullLocation {
  getById({kingdomId}) {
    return [{
        kingdomId: kingdomId,
        kingdomName: 'firstKingdom',
        userId: 2,
        location: 'STB'
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

test('attachLocation: missing kingdomId returns error 104', async () => {
  try {
    const result = await kingdom.attachLocation({locationCode: 'TST'}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('attachLocation: missing locationCode returns error 109', async () => {
  try {
    const result = await kingdom.attachLocation({kingdomId: 13}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(109) );
  }
});

test('attachLocation: located kingdomId returns error 304', async () => {
  const kingdom = new KingdomService({KingdomRepo:KingdomRepo_notnullLocation,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});
  try {
    const result = await kingdom.attachLocation({kingdomId: 13, locationCode: 'TST'}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(304) );
  }
});

test('attachLocation: used location returns error 309', async () => {
  const kingdom = new KingdomService({KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});
  try {
    const result = await kingdom.attachLocation({kingdomId: 13, locationCode: 'ABC'}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(309) );
  }
});

test('attachLocation: valid userdata returns valid result', async () => {
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

test('getById: missing kingdomId returns error 104', async () => {
  try {
    const result = await kingdom.getById({}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('getById: valid userdata returns valid result', async () => {
  const result = await kingdom.getById({kingdomId: 44}); 
  expect(result).toStrictEqual({
    id: 44,
    name: 'firstKingdom',
    userId: 2,
    buildings: [
      {
        "finished_at": "2020-08-19 19:06:22",
        "hp": 1,
        "id": 1,
        "kingdomId": 44,
        "level": 1,
        "started_at": "2020-08-19 19:06:22",
        "type": "academy"
      },
      {
        "finished_at": "2020-08-19 19:06:22",
        "hp": 1,
        "id": 2,
        "kingdomId": 44,
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
    location: { "country_code": null }
  });
});

test('get: returns valid result', async () => {
  const result = await kingdom.get(); 
  expect(result).toStrictEqual([
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
  ]);
});
