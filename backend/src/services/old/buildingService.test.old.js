import { buildingService } from './buildingService';
jest.mock('../repos/kingdomRepo');
import { kingdomRepo } from '../repos/kingdomRepo';
jest.mock('./resourceService');
import { resourceService } from './resourceService';
jest.mock('../repos/buildingRepo');
import { buildingRepo } from '../repos/buildingRepo';


test('building type missing', async () => {
  const input = {
    kingdomId : 1,
  };
  try {
    await buildingService.add(input);
  } catch(err) {
    expect(err).toStrictEqual( Error(1) );
  }
});

test('building type is invaild', async () => {
  const input = {
    kingdomId : 1,
    type: 'randomtype'
  };
  try {
    await buildingService.add(input);
  } catch(err) {
    expect(err).toStrictEqual( Error(2) );
  }
});

test('kingdomId is invaild', async () => {
  const input = {
    kingdomId : 100,
    type: 'farm'
  };
  kingdomRepo.getKingdomBaseData.mockImplementation( () => [] );
  try {
    await buildingService.add(input);
  } catch(err) {
    expect(err).toStrictEqual( Error(4) );
  }
});

test('not enough gold', async () => {
  const input = {
    kingdomId : 100,
    type: 'farm'
  };
  kingdomRepo.getKingdomBaseData.mockImplementation( () => {
    return {'userid' : 1, 'kingdomname' : 'London'}
  });
  resourceService.getResource.mockImplementation( () => {
    return {
      "resources": [
        {
            "type": "food",
            "amount": 1590,
            "generation": 10,
            "updatedAt": "2020-08-08T15:24:40.000Z"
        },
        {
            "type": "gold",
            "amount": 10,
            "generation": 25,
            "updatedAt": "2020-08-08T15:24:40.000Z"
        }
      ]
    }
  });
  try {
    await buildingService.add(input);
  } catch(err) {
    expect(err).toStrictEqual( Error(3) );
  }
});

test('valid inputs -> successful call', async () => {
  const input = {
    kingdomId : 1,
    type: 'academy'
  };
  const formalData = {
    "id": 72,
    "kingdomId": 1,
    "type": "academy",
    "level": 1,
    "hp": 1,
    "started_at": 1596972161000,
    "finished_at": 1596972221000
  };
  kingdomRepo.getKingdomBaseData.mockImplementation( () => {
    return {'userid' : 1, 'kingdomname' : 'London'}
  });
  resourceService.getResource.mockImplementation( () => {
    return {
      "resources": [
        {
            "type": "food",
            "amount": 1590,
            "generation": 10,
            "updatedAt": "2020-08-08T15:24:40.000Z"
        },
        {
            "type": "gold",
            "amount": 1000,
            "generation": 25,
            "updatedAt": "2020-08-08T15:24:40.000Z"
        }
      ]
    }
  });
  resourceService.spendGold.mockImplementation( () => {} );
  resourceService.updateGoldGeneration.mockImplementation( () => {} );
  resourceService.updateFoodGeneration.mockImplementation( () => {} );
  buildingRepo.add.mockImplementation( () => 72 );
  const result = await buildingService.add(input);
  formalData.started_at = result.started_at;
  formalData.finished_at = result.finished_at;
  expect(result).toStrictEqual( formalData );
});
