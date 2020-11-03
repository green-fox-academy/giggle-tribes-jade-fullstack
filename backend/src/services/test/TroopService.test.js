import { BuildingService, ResourceService, TroopService } from '../../services';
import { errorCodes } from '../../repos';

const db = {
  query: (...query) => {
    return {
      results: {
        query: query[0],
        params: query[1],
        insertId: 4,
      },
    };
  },
};

class ResourceRepo {
  static gold = 300;
  static food = 200;
  static gold_generation = 5;
  static food_generation = 10;

  constructor() {
    this.resources = [
      {
        id: 1,
        kingdom_id: 22,
        type: 'gold',
        amount: 300,
        generation: 5,
        updatedAt: '2020-08-19 19:06:22',
      },
      {
        id: 2,
        kingdom_id: 22,
        type: 'food',
        amount: 200,
        generation: 10,
        updatedAt: '2020-08-19 19:06:22',
      },
    ];
  }

  async update({ kingdomId, type, amount, generation }) {
    switch (type) {
      case 'gold':
        this.resources[0] = {
          id: 1,
          kingdom_id: kingdomId,
          type: type,
          amount: amount,
          generation: generation,
          updatedAt: '2020-08-19 19:06:22',
        };
        ResourceRepo.gold = amount;
        ResourceRepo.gold_generation = generation;
        break;
      case 'food':
        this.resources[1] = {
          id: 2,
          kingdom_id: kingdomId,
          type: type,
          amount: amount,
          generation: generation,
          updatedAt: '2020-08-19 19:06:22',
        };
        ResourceRepo.food = amount;
        ResourceRepo.food_generation = generation;
        break;
    }
  }

  async getByKingdomId({ kingdomId }) {
    return this.resources;
  }
}

class BuildingRepo {
  constructor() {
    this.buildings = [
      {
        id: 1,
        kingdom_id: 22,
        type: 'townhall',
        level: 1,
        hp: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22',
      },
      {
        id: 1,
        kingdom_id: 22,
        type: 'academy',
        level: 2,
        hp: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:06:22',
      },
    ];
  }

  async getByKingdomId({ kingdomId }) {
    return this.buildings;
  }
}

class TroopRepo {
  constructor() {
    this.troops = [
      {
        id: 1,
        kingdom_id: 12,
        level: 1,
        hp: 1,
        defence: 1,
        attack: 1,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:07:22',
      },
      {
        id: 2,
        kingdom_id: 12,
        level: 2,
        hp: 2,
        defence: 2,
        attack: 2,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:07:22',
      },
    ];
  }

  async update(troopData, ids) {
    ids.forEach(e => {
      const troop = this.troops.find(troop => troop.id == e);

      troop.level = troopData.level;
      troop.hp = troopData.hp;
      troop.defence = troopData.defence;
      troop.attack = troopData.attack;
      troop.started_at = '2020-08-19 19:06:22';
      troop.finished_at = '2020-08-19 19:07:22';
    });
  }

  async getByKingdomId({ kingdomId }) {
    return this.troops;
  }

  async add(troopData) {
    const insertId = this.troops.length + 1;
    troopData.id = insertId;
    this.troops.push(troopData);
    return { insertId };
  }
}

const resourceRepo = new ResourceRepo(db, errorCodes);
const buildingRepo = new BuildingRepo(db, errorCodes);
const troopRepo = new TroopRepo(db, errorCodes);
const resourceService = new ResourceService({ resourceRepo, errorCodes });
const buildingService = new BuildingService({ buildingRepo, errorCodes });
const troop = new TroopService({
  troopRepo,
  resourceService,
  buildingService,
  errorCodes,
});

describe('TroopService.add', () => {
  test('add: missing kingdomId returns error 104', async () => {
    try {
      const result = await troop.add({});
    } catch (err) {
      expect(err).toStrictEqual(Error(104));
    }
  });

  test('add: exceeded troop limit returns error 214', async () => {
    const buildingService = {
      async getByKingdomId() {
        return { buildings: [{ type: 'townhall', level: 1 }] };
      },
    };
    const troopRepo = {
      async getByKingdomId() {
        return new Array(100);
      },
    };
    const resourceService = {
      async getByKingdomId() {
        return { resources: [{ type: 'gold', amount: 100 }] };
      },
    };
    const troop = new TroopService({
      troopRepo,
      resourceService,
      buildingService,
      errorCodes,
    });
    try {
      const result = await troop.add({ kingdomId: 12 });
    } catch (err) {
      expect(err).toStrictEqual(Error(214));
    }
  });

  test('add: returns troop data', async () => {
    const result = await troop.add({ kingdomId: 12 });
    result.started_at = '2020-08-19 19:06:22';
    result.finished_at = '2020-08-19 19:07:22';
    expect(result).toStrictEqual({
      id: 3,
      kingdom_id: 12,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: '2020-08-19 19:06:22',
      finished_at: '2020-08-19 19:07:22',
    });
    expect(ResourceRepo.gold).toBe(290);
    expect(ResourceRepo.food).toBe(200);
    expect(ResourceRepo.gold_generation).toBe(5);
    expect(ResourceRepo.food_generation).toBe(9);
  });

  test('add: not enough gold returns error 207', async () => {
    const buildingService = {
      async getByKingdomId() {
        return { buildings: [{ type: 'townhall', level: 1 }] };
      },
    };
    const troopRepo = {
      async getByKingdomId() {
        return [];
      },
    };
    const resourceService = {
      async getByKingdomId() {
        return { resources: [{ type: 'gold', amount: 9 }] };
      },
    };
    const troop = new TroopService({
      troopRepo,
      resourceService,
      buildingService,
      errorCodes,
    });
    try {
      const result = await troop.add({ kingdomId: 12 });
    } catch (err) {
      expect(err).toStrictEqual(Error(207));
    }
  });
});

describe('TroopService.upgrade', () => {
  test('upgrade: missing kingdomId returns error 104', async () => {
    try {
      const result = await troop.upgrade({});
    } catch (err) {
      expect(err).toStrictEqual(Error(104));
    }
  });

  test('upgrade: missing kingdomId returns error 104', async () => {
    try {
      const result = await troop.upgrade({ kingdomId: 1 });
    } catch (err) {
      expect(err).toStrictEqual(Error(114));
    }
  });

  test('upgrade: missing kingdomId returns error 104', async () => {
    try {
      const result = await troop.upgrade({ kingdomId: 1, level: 1 });
    } catch (err) {
      expect(err).toStrictEqual(Error(115));
    }
  });

  test('upgrade: exceeded troop limit returns error 304', async () => {
    const buildingService = {
      async getByKingdomId() {
        return { buildings: [{ type: 'academy', level: 2 }] };
      },
    };
    const troopRepo = {
      async getByKingdomId() {
        return [{ level: 2 }];
      },
    };
    const resourceService = {
      async getByKingdomId() {
        return { resources: [{ type: 'gold', amount: 100 }] };
      },
    };
    const troop = new TroopService({
      troopRepo,
      resourceService,
      buildingService,
      errorCodes,
    });
    try {
      const result = await troop.upgrade({
        kingdomId: 12,
        level: 2,
        amount: 1,
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(215));
    }
  });

  test('upgrade: returns troop data', async () => {
    const result = await troop.upgrade({ kingdomId: 12, level: 1, amount: 1 });
    expect(result).toStrictEqual({
      troops: [
        {
          id: 1,
          kingdom_id: 12,
          level: 2,
          hp: 2,
          attack: 2,
          defence: 2,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:07:22',
        },
        {
          id: 2,
          kingdom_id: 12,
          level: 2,
          hp: 2,
          attack: 2,
          defence: 2,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:07:22',
        },
        {
          id: 3,
          kingdom_id: 12,
          level: 2,
          hp: 2,
          attack: 2,
          defence: 2,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:07:22',
        },
      ],
    });
    expect(ResourceRepo.gold).toBe(280);
    expect(ResourceRepo.food).toBe(200);
    expect(ResourceRepo.gold_generation).toBe(5);
    expect(ResourceRepo.food_generation).toBe(8);
  });

  test('upgrade: not enough gold returns error 207', async () => {
    const buildingService = {
      async getByKingdomId() {
        return { buildings: [{ type: 'academy', level: 2 }] };
      },
    };
    const troopRepo = {
      async getByKingdomId() {
        return [{ level: 1 }, { level: 1 }, { level: 1 }];
      },
    };
    const resourceService = {
      async getByKingdomId() {
        return { resources: [{ type: 'gold', amount: 1 }] };
      },
    };
    const troop = new TroopService({
      troopRepo,
      resourceService,
      buildingService,
      errorCodes,
    });
    try {
      const result = await troop.upgrade({
        kingdomId: 12,
        level: 1,
        amount: 2,
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(207));
    }
  });
});
