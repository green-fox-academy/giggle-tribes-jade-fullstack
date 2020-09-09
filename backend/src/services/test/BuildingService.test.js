import { ResourceService, BuildingService } from '../../services';
import { errorCodes, BuildingRepo } from '../../repos';

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

const building = new BuildingService({BuildingRepo,ResourceService,ResourceRepo,db,errorCodes});

test('add: missing kingdomId returns error 104', async () => {
  try {
    const result = await building.add({}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('add: missing buildingType returns error 111', async () => {
  try {
    const result = await building.add({kingdomId: 3}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(111) );
  }
});

test('add: invalid buildingType returns error 211', async () => {
  try {
    const result = await building.add({kingdomId: 3, buildingType: 'test'}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(211) );
  }
});

test('add: academy->farm->mine returns building data', async () => {
  
  let result = await building.add({kingdomId: 3, buildingType: 'academy'});
  result.started_at = '2020-08-19 19:06:22';
  result.finished_at = '2020-08-19 19:06:22';
  expect(result).toStrictEqual({
    id : 4,
    kingdomId : 3,
    type : 'academy',
    level : 1,
    hp : 1,
    started_at : '2020-08-19 19:06:22',
    finished_at : '2020-08-19 19:06:22'
  });
  expect(ResourceRepo.gold).toBe( 200 );
  expect(ResourceRepo.food).toBe( 200 );
  expect(ResourceRepo.gold_generation).toBe( 5 );
  expect(ResourceRepo.food_generation).toBe( 10 );

  result = await building.add({kingdomId: 3, buildingType: 'farm'});
  result.started_at = '2020-08-19 19:06:22';
  result.finished_at = '2020-08-19 19:06:22';
  expect(result).toStrictEqual({
    id : 4,
    kingdomId : 3,
    type : 'farm',
    level : 1,
    hp : 1,
    started_at : '2020-08-19 19:06:22',
    finished_at : '2020-08-19 19:06:22'
  });
  expect(ResourceRepo.gold).toBe( 100 );
  expect(ResourceRepo.food).toBe( 200 );
  expect(ResourceRepo.gold_generation).toBe( 5 );
  expect(ResourceRepo.food_generation).toBe( 15 );

  result = await building.add({kingdomId: 3, buildingType: 'mine'});
  result.started_at = '2020-08-19 19:06:22';
  result.finished_at = '2020-08-19 19:06:22';
  expect(result).toStrictEqual({
    id : 4,
    kingdomId : 3,
    type : 'mine',
    level : 1,
    hp : 1,
    started_at : '2020-08-19 19:06:22',
    finished_at : '2020-08-19 19:06:22'
  });
  expect(ResourceRepo.gold).toBe( 0 );
  expect(ResourceRepo.food).toBe( 200 );
  expect(ResourceRepo.gold_generation).toBe( 10 );
  expect(ResourceRepo.food_generation).toBe( 15 );

});

test('add: not enough gold returns error 207', async () => {
  try {
    for (let i = 0; i < 100; i++) await building.add({kingdomId: 3, buildingType: 'mine'}); 
  } catch(err) {
    expect(err).toStrictEqual( Error(207) );
  }
});
