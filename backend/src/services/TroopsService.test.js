import { TroopsService } from './TroopsService';

/* const resourceService = {
  async getResource() {
    return await Promise.resolve({
      resources: [
        {
          type: 'food',
          amount: 500,
          generation: 1,
          updatedAt: '2020-07-04T08:45:00.000Z',
        },
        {
          type: 'gold',
          amount: 500,
          generation: 1,
          updatedAt: '2020-07-04T08:45:00.000Z',
        },
      ],
    });
  },
}; */
/* const getTroopsForKingdom = async () => {
  return Promise.resolve([
    {
      id: 1,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: '2020-07-04T08:45:00.000Z',
      finished_at: '2020-07-04T08:46:00.000Z',
    },
    {
      id: 2,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: '2020-07-04T09:45:00.000Z',
      finished_at: '2020-07-04T09:46:00.000Z',
    },
  ]);
};
const insertTroopForKingdom = async () => {
  return Promise.resolve([{ insertId: 1 }]);
}; */

//const troopsService = new TroopsService({resourceService,getTroopsForKingdom,insertTroopForKingdom});

describe('getTroops', () => {
  test('getTroops is ok, kingdomID not found', async () => {
    const troops = [];
    const getTroopsForKingdom = async () => {
      return Promise.resolve(troops);
    };

    const troopsService = new TroopsService({
      getTroopsForKingdom,
    });

    const result = await troopsService.getTroops({ kingdomID: '1' });

    expect(result).toStrictEqual({
      troops: troops,
    });
  });

  test('getTroops is ok, kingdomID found', async () => {
    const troops = [
      {
        id: 1,
        level: 1,
        hp: 1,
        attack: 1,
        defence: 1,
        started_at: '2020-07-04T08:45:00.000Z',
        finished_at: '2020-07-04T08:46:00.000Z',
      },
      {
        id: 2,
        level: 1,
        hp: 1,
        attack: 1,
        defence: 1,
        started_at: '2020-07-04T09:45:00.000Z',
        finished_at: '2020-07-04T09:46:00.000Z',
      },
    ];

    const getTroopsForKingdom = async () => {
      return Promise.resolve(troops);
    };
    const troopsService = new TroopsService({ getTroopsForKingdom });
    const result = await troopsService.getTroops({ kingdomID: '1' });
    expect(result).toStrictEqual({
      troops: troops,
    });
  });

  it('getTroops failed, missing kingdomID', async () => {
    const troopsService = new TroopsService({});
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

    const troops = [
      {
        id: 1,
        level: 1,
        hp: 1,
        attack: 1,
        defence: 1,
        started_at: '2020-07-04T08:45:00.000Z',
        finished_at: '2020-07-04T08:46:00.000Z',
      },
      {
        id: 2,
        level: 1,
        hp: 1,
        attack: 1,
        defence: 1,
        started_at: '2020-07-04T09:45:00.000Z',
        finished_at: '2020-07-04T09:46:00.000Z',
      },
    ];
    const getTroopsForKingdom = async () => {
      return Promise.resolve(troops);
    };
    const insertTroopForKingdom = async () => {
      return Promise.resolve({ insertId: 3 });
    };
    const resourceService = {
      async getResource() {
        return await Promise.resolve({
          resources: [
            {
              type: 'food',
              amount: 500,
              generation: 1,
              updatedAt: '2020-07-04T08:45:00.000Z',
            },
            {
              type: 'gold',
              amount: 500,
              generation: 1,
              updatedAt: '2020-07-04T08:45:00.000Z',
            },
          ],
        });
      },
    };

    const troopsService = new TroopsService({
      getTroopsForKingdom,
      insertTroopForKingdom,
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
        return await Promise.resolve({
          resources: [
            {
              type: 'food',
              amount: 500,
              generation: 1,
              updatedAt: '2020-07-04T08:45:00.000Z',
            },
            {
              type: 'gold',
              amount: 9,
              generation: 1,
              updatedAt: '2020-07-04T08:45:00.000Z',
            },
          ],
        });
      },
    };

    const getTroopsForKingdom = async () => {
      return Promise.resolve([]);
    };

    const troopsService = new TroopsService({
      resourceService,
      getTroopsForKingdom,
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
        return await Promise.resolve({
          resources: [
            {
              type: 'food',
              amount: 500,
              generation: 1,
              updatedAt: '2020-07-04T08:45:00.000Z',
            },
            {
              type: 'gold',
              amount: 500,
              generation: 1,
              updatedAt: '2020-07-04T08:45:00.000Z',
            },
          ],
        });
      },
    };

    const getTroopsForKingdom = async () => {
      return Promise.resolve(new Array(100));
    };

    const troopsService = new TroopsService({
      resourceService,
      getTroopsForKingdom,
    });

    expect(async () => {
      await troopsService.addTroop({ kingdomID: 1 });
    }).rejects.toStrictEqual({
      error: 'You reached the storage limit, upgrade Townhall first.',
    });
  });
});
