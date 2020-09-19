import { ResourceService } from '../../services';
import { errorCodes } from '../../repos';

const db = {};

class ResourceRepo {

  constructor() {
    this.resources = [
      {
        id: 1,
        kingdom_id: 22,
        type: 'gold',
        amount: 100,
        generation: 5,
        updatedAt: '2020-08-19 19:06:22'
      },
      {
        id: 2,
        kingdom_id: 22,
        type: 'food',
        amount: 200,
        generation: 10,
        updatedAt: '2020-08-19 19:06:22'
      },
    ];
  };

  async update({kingdomId,type,amount,generation}) {
      switch(type) {
        case 'gold':
          this.resources[0] = {
            id: 1,
            kingdom_id: kingdomId,
            type: type,
            amount: (amount > 1000) ? 1000 : amount,
            generation: generation,
            updatedAt: '2020-08-19 19:06:22'
          };
          break;
        case 'food':
          this.resources[1] = {
            id: 2,
            kingdom_id: kingdomId,
            type: type,
            amount: (amount > 1000) ? 1000 : amount,
            generation: generation,
            updatedAt: '2020-08-19 19:06:22'
          };
        break;
      }
  };

  async getByKingdomId({kingdomId}) {
    return this.resources;
  };

};

class ResourceRepo_noResource {

  constructor() {
    this.resources = [];
  };

  async add({kingdomId,type,amount,generation}) {
    this.resources.push({
      id: 1,
      kingdom_id: kingdomId,
      type: type,
      amount: amount,
      generation: generation,
      updatedAt: '2020-08-19 19:06:22'
    });
  };

  async getByKingdomId({kingdomId}) {
    return this.resources;
  };

};


test('getById: missing kingdomId returns error 104', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  try {
    const result = await resources.getByKingdomId({}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('getById: returns valid result', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  const result = await resources.getByKingdomId({kingdomId: 77}); 
  expect(result).toStrictEqual({resources: [
    {
      type: 'gold',
      amount: 100,
      generation: 5,
      updatedAt: '2020-08-19 19:06:22'
    },
    {
      type: 'food',
      amount: 200,
      generation: 10,
      updatedAt: '2020-08-19 19:06:22'
    },
  ]});
});

test('add: missing kingdomId returns error 104', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  try {
    const result = await resources.add({}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('add: existing resource returns error 304', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  try {
    const result = await resources.add({kingdomId:77}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(304) );
  }
});

test('add: kingdomId without startAmount returns modified data', async () => {
  const resourceRepo = new ResourceRepo_noResource( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  await resources.add({kingdomId:77});
  const result = await resources.getByKingdomId({kingdomId: 77}); 
  expect(result).toStrictEqual({resources: [
    {
      type: 'gold',
      amount: 0,
      generation: 0,
      updatedAt: '2020-08-19 19:06:22'
    },
    {
      type: 'food',
      amount: 0,
      generation: 0,
      updatedAt: '2020-08-19 19:06:22'
    },
  ]});
});

test('add: kingdomId with startAmount returns modified data', async () => {
  const resourceRepo = new ResourceRepo_noResource( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  await resources.add({kingdomId:77, startAmount: 500});
  const result = await resources.getByKingdomId({kingdomId: 77}); 
  expect(result).toStrictEqual({resources: [
    {
      type: 'gold',
      amount: 500,
      generation: 0,
      updatedAt: '2020-08-19 19:06:22'
    },
    {
      type: 'food',
      amount: 500,
      generation: 0,
      updatedAt: '2020-08-19 19:06:22'
    },
  ]});
});

test('generateResources: missing kingdomId returns error 104', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  try {
    const result = await resources.generateResources({}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('generateResources: valid kingdomId returns modified data', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  await resources.generateResources({kingdomId: 77}); 
  const result = await resources.getByKingdomId({kingdomId: 77}); 
  expect(result).toStrictEqual({resources: [
    {
      type: 'gold',
      amount: 1000,
      generation: 5,
      updatedAt: '2020-08-19 19:06:22'
    },
    {
      type: 'food',
      amount: 1000,
      generation: 10,
      updatedAt: '2020-08-19 19:06:22'
    },
  ]});
});

test('spendGold: missing kingdomId returns error 104', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  try {
    const result = await resources.spendGold({}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('spends and updates: valid kingdomId returns modified data', async () => {
  const resourceRepo = new ResourceRepo( db, errorCodes );
  const resources = new ResourceService({ resourceRepo, errorCodes });
  await resources.spendGold({kingdomId: 23, amount: 100});
  await resources.spendFood({kingdomId: 23, amount: 100});
  await resources.updateGoldGeneration({kingdomId: 23, generation: 10});
  await resources.updateFoodGeneration({kingdomId: 23, generation: 20});
  const result = await resources.getByKingdomId({kingdomId: 23}); 
  expect(result).toStrictEqual({resources: [
    {
      type: 'gold',
      amount: 0,
      generation: 15,
      updatedAt: '2020-08-19 19:06:22'
    },
    {
      type: 'food',
      amount: 100,
      generation: 30,
      updatedAt: '2020-08-19 19:06:22'
    },
  ]});
});
