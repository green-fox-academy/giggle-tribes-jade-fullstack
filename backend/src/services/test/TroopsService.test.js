import { TroopsService } from './TroopsService.js';

const troopsFactory = {
  async get(troops) {
    return Promise.resolve(troops);
  },
  async insert(result) {
    return Promise.resolve(result);
  },
};

const resourceFactory = {
  async getResource(amount) {
    return await Promise.resolve({
      resources: [
        {
          type: 'gold',
          amount: amount,
        },
      ],
    });
  },
  async spendGold() {
    return await Promise.resolve();
  },
  async updateFoodGeneration() {
    return await Promise.resolve();
  },
};

describe('getTroops', () => {
  test('getTroops is ok, troops belonging to kingdomID found', async () => {
    const troopsRepo = {
      get: async () => {
        return troopsFactory.get([
          {
            id: 1,
          },
        ]);
      },
    };
    const troopsService = new TroopsService({ troopsRepo });
    const result = await troopsService.getTroops({ kingdomID: '1' });
    expect(result).toStrictEqual({
      troops: [
        {
          id: 1,
        },
      ],
    });
  });

  it('getTroops failed, missing kingdomID', async () => {
    const troopsRepo = {
      get: async () => {
        return { error: 'Kingdom ID is required.' };
      },
    };

    const troopsService = new TroopsService({ troopsRepo });
    expect(async () => {
      await troopsService.getTroops({});
    }).rejects.toEqual({
      error: 'Kingdom ID is required.',
    });
  });
});

describe('addTroop', () => {
  test('addTroop is ok', async () => {
    const mockDate = new Date(0);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const troopsRepo = {
      get: async () => {
        return troopsFactory.get([]);
      },
      insert: async () => {
        return troopsFactory.insert({ insertId: 3 });
      },
    };

    const resourceService = {
      async getResource() {
        return resourceFactory.getResource(10);
      },
      async spendGold() {
        return resourceFactory.spendGold();
      },
      async updateFoodGeneration() {
        return resourceFactory.updateFoodGeneration();
      },
    };

    const troopsService = new TroopsService({
      troopsRepo,
      resourceService,
    });

    expect(await troopsService.addTroop({ kingdomID: 1 })).toStrictEqual({
      id: 3,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: mockDate,
      finished_at: mockDate,
    });
  });
  test('addTroop fails, not enough money', async () => {
    const resourceService = {
      async getResource() {
        return resourceFactory.getResource(9);
      },
    };

    const troopsRepo = {
      get: async () => {
        return troopsFactory.get([]);
      },
    };

    const troopsService = new TroopsService({
      resourceService,
      troopsRepo,
    });

    expect(async () => {
      await troopsService.addTroop({ kingdomID: 1 });
    }).rejects.toStrictEqual({
      error: "You don't have enough money.",
    });
  });
  test('addTroop fails, not enough capacity', async () => {
    const resourceService = {
      async getResource() {
        return resourceFactory.getResource(10);
      },
    };
    const troopsRepo = {
      get: async () => {
        return troopsFactory.get(new Array(100));
      },
    };

    const troopsService = new TroopsService({
      resourceService,
      troopsRepo,
    });

    expect(async () => {
      await troopsService.addTroop({ kingdomID: 1 });
    }).rejects.toStrictEqual({
      error: 'You reached the storage limit, upgrade Townhall first.',
    });
  });
});
