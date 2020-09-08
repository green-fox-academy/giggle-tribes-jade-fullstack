import { ResourceService, TroopService } from '../../services';
import { errorCodes, TroopRepo } from '../../repos';

const db = {
  query: (...query) => {
      return {
          results: {
              query: query[0],
              params: query[1],
              insertId: 4
          }
      }
  }
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
            amount: amount,
            generation: generation,
            updatedAt: '2020-08-19 19:06:22'
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
            updatedAt: '2020-08-19 19:06:22'
          };
          ResourceRepo.food = amount;
          ResourceRepo.food_generation = generation;
        break;
      }
  };

  async getByKingdomId({kingdomId}) {
    return this.resources;
  };

};

const troop = new TroopService({TroopRepo,ResourceService,ResourceRepo,db,errorCodes});

test('add: missing kingdomId returns error 104', async () => {
  try {
    const result = await troop.add({}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('add: exceeded troop limit returns error 304', async () => {
  const db = {
    query: (...query) => {
        return {
            results: new Array(101)
        }
    }
  };
  const troop = new TroopService({TroopRepo,ResourceService,ResourceRepo,db,errorCodes});
  try {
    const result = await troop.add({kingdomId: 12});
  } catch(err) {
    expect(err).toStrictEqual( Error(304) );
  }
});

test('add: returns troop data', async () => {
  const result = await troop.add({kingdomId: 3});
  result.started_at = '2020-08-19 19:06:22';
  result.finished_at = '2020-08-19 19:06:22';
  expect(result).toStrictEqual({
    id : 4,
    kingdomId : 3,
    level : 1,
    hp : 1,
    attack : 1,
    defence : 1,
    started_at : '2020-08-19 19:06:22',
    finished_at : '2020-08-19 19:06:22'
  });
  expect(ResourceRepo.gold).toBe( 290 );
  expect(ResourceRepo.food).toBe( 200 );
  expect(ResourceRepo.gold_generation).toBe( 5 );
  expect(ResourceRepo.food_generation).toBe( 9 );
});

test('add: not enough gold returns error 207', async () => {
  try {
    for (let i = 0; i < 100; i++) await troop.add({kingdomId: 3}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(207) );
  }
});
