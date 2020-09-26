import { KingdomService } from '../../services';
import { errorCodes } from '../../repos';

const db = {};

class LocationRepo {
  async add({ kingdomId, locationCode }) {
    return [{}];
  }
}

class BuildingService {
  async getByKingdomId({ kingdomId }) {
    return {
      buildings: [
        {
          id: 1,
          kingdomId: kingdomId,
          type: 'academy',
          level: 1,
          hp: 1,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:06:22',
        },
        {
          id: 2,
          kingdomId: kingdomId,
          type: 'farm',
          level: 4,
          hp: 1,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:06:22',
        },
      ],
    };
  }
}

class TroopService {
  async getByKingdomId({ kingdomId }) {
    return {
      troops: [
        {
          id: 1,
          kingdomId: kingdomId,
          level: 1,
          hp: 1,
          defence: 1,
          attack: 1,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:06:22',
        },
        {
          id: 2,
          kingdomId: kingdomId,
          level: 4,
          hp: 1,
          defence: 1,
          attack: 1,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:06:22',
        },
      ],
    };
  }
}

class ResourceService {
  async getByKingdomId({ kingdomId }) {
    return {
      resources: [
        {
          type: 'gold',
          amount: 100,
          generation: 5,
          updatedAt: '2020-08-19 19:06:22',
        },
        {
          type: 'food',
          amount: 200,
          generation: 10,
          updatedAt: '2020-08-19 19:06:22',
        },
      ],
    };
  }
}

class KingdomRepo {
  getById({ kingdomId }) {
    return [
      {
        kingdomId: kingdomId,
        kingdomName: 'firstKingdom',
        userId: 2,
        location: null,
      },
    ];
  }
  async get() {
    return [
      {
        kingdomId: 1,
        kingdomName: 'firstKingdom',
        location: 'ABC',
      },
      {
        kingdomId: 2,
        kingdomName: 'secondKingdom',
        location: 'DEF',
      },
    ];
  }
}

class KingdomRepo_notnullLocation {
  getById({ kingdomId }) {
    return [
      {
        kingdomId: kingdomId,
        kingdomName: 'firstKingdom',
        userId: 2,
        location: 'STB',
      },
    ];
  }
  async get() {
    return [
      {
        kingdomId: 1,
        kingdomName: 'firstKingdom',
        location: 'ABC',
      },
      {
        kingdomId: 2,
        kingdomName: 'secondKingdom',
        location: 'DEF',
      },
    ];
  }
}

const kingdomRepo = new KingdomRepo(db, errorCodes);
const resourceService = new ResourceService(db, errorCodes);
const buildingService = new BuildingService(db, errorCodes);
const troopService = new TroopService(db, errorCodes);
const locationRepo = new LocationRepo(db, errorCodes);
const kingdom = new KingdomService({
  kingdomRepo,
  resourceService,
  buildingService,
  troopService,
  locationRepo,
  errorCodes,
});

test('attachLocation: missing kingdomId returns error 104', async () => {
  try {
    await kingdom.attachLocation({ locationCode: 'TST' });
  } catch (err) {
    expect(err).toStrictEqual(Error(104));
  }
});

test('attachLocation: missing locationCode returns error 109', async () => {
  try {
    await kingdom.attachLocation({ kingdomId: 13 });
  } catch (err) {
    expect(err).toStrictEqual(Error(109));
  }
});

test('attachLocation: located kingdomId returns error 304', async () => {
  const kingdomRepo = new KingdomRepo_notnullLocation(db, errorCodes);
  const kingdom = new KingdomService({
    kingdomRepo,
    resourceService,
    buildingService,
    troopService,
    locationRepo,
    errorCodes,
  });
  try {
    await kingdom.attachLocation({
      kingdomId: 13,
      locationCode: 'TST',
    });
  } catch (err) {
    expect(err).toStrictEqual(Error(304));
  }
});

test('attachLocation: used location returns error 309', async () => {
  try {
    await kingdom.attachLocation({
      kingdomId: 13,
      locationCode: 'ABC',
    });
  } catch (err) {
    expect(err).toStrictEqual(Error(309));
  }
});

test('attachLocation: valid userdata returns valid result', async () => {
  const result = await kingdom.attachLocation({
    kingdomId: 13,
    locationCode: 'TST',
  });
  expect(result).toStrictEqual({
    kingdomId: 13,
    kingdomName: 'firstKingdom',
    userId: 2,
    buildings: [
      {
        finished_at: '2020-08-19 19:06:22',
        hp: 1,
        id: 1,
        kingdomId: 13,
        level: 1,
        started_at: '2020-08-19 19:06:22',
        type: 'academy',
      },
      {
        finished_at: '2020-08-19 19:06:22',
        hp: 1,
        id: 2,
        kingdomId: 13,
        level: 4,
        started_at: '2020-08-19 19:06:22',
        type: 'farm',
      },
    ],
    resources: [
      {
        amount: 100,
        generation: 5,
        type: 'gold',
        updatedAt: '2020-08-19 19:06:22',
      },
      {
        amount: 200,
        generation: 10,
        type: 'food',
        updatedAt: '2020-08-19 19:06:22',
      },
    ],
    troops: [
      {
        id: 1,
        kingdomId: 13,
        level: 1,
        hp: 1,
        defence: 1,
        attack: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22',
      },
      {
        id: 2,
        kingdomId: 13,
        level: 4,
        hp: 1,
        defence: 1,
        attack: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22',
      },
    ],
    location: { country_code: 'TST' },
  });
});

test('getById: missing kingdomId returns error 104', async () => {
  try {
    await kingdom.getById({});
  } catch (err) {
    expect(err).toStrictEqual(Error(104));
  }
});

test('getById: valid userdata returns valid result', async () => {
  const result = await kingdom.getById({ kingdomId: 44 });
  expect(result).toStrictEqual({
    kingdomId: 44,
    kingdomName: 'firstKingdom',
    userId: 2,
    location: { country_code: null },
    buildings: [
      {
        finished_at: '2020-08-19 19:06:22',
        hp: 1,
        id: 1,
        kingdomId: 44,
        level: 1,
        started_at: '2020-08-19 19:06:22',
        type: 'academy',
      },
      {
        finished_at: '2020-08-19 19:06:22',
        hp: 1,
        id: 2,
        kingdomId: 44,
        level: 4,
        started_at: '2020-08-19 19:06:22',
        type: 'farm',
      },
    ],
    resources: [
      {
        amount: 100,
        generation: 5,
        type: 'gold',
        updatedAt: '2020-08-19 19:06:22',
      },
      {
        amount: 200,
        generation: 10,
        type: 'food',
        updatedAt: '2020-08-19 19:06:22',
      },
    ],
    troops: [
      {
        id: 1,
        kingdomId: 44,
        level: 1,
        hp: 1,
        defence: 1,
        attack: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22',
      },
      {
        id: 2,
        kingdomId: 44,
        level: 4,
        hp: 1,
        defence: 1,
        attack: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22',
      },
    ],
  });
});

test('get: returns valid result', async () => {
  const result = await kingdom.get();
  expect(result).toStrictEqual({
    kingdoms: [
      {
        kingdomId: 1,
        kingdomName: 'firstKingdom',
        location: 'ABC',
      },
      {
        kingdomId: 2,
        kingdomName: 'secondKingdom',
        location: 'DEF',
      },
    ],
  });
});
