import { resourceService } from '../services';
import {
  getResourceForKingdom,
  updateResourceForKingdom,
  insertResourceForKingdom,
} from '../repos/resource';
jest.mock('../repos/resource');

//GetResource Test
test('GetResource - Kingdom ID is required.', async () => {
  await expect(resourceService.getResource({})).rejects.toStrictEqual({
    error: 'Kingdom ID is required.',
  });
});

test('GetResource - Resource for this kingdom not found.', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([]);
  });

  await expect(
    resourceService.getResource({ kingdomID: '1' })
  ).rejects.toStrictEqual({
    error: 'GetResource failed. Kingdom ID not found.',
  });
});

test('GetResource - Resource for kingdom found.', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return await Promise.resolve([
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
    ]);
  });

  expect(await resourceService.getResource({ kingdomID: '1' })).toStrictEqual({
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
});
//UpdateResource Tests

test('UpdateResource - Update failed. Kingdom ID is required.', async () => {
  await expect(resourceService.updateResource({})).rejects.toStrictEqual({
    error: 'Kingdom ID is required.',
  });
});

test('UpdateResource - Update failed. Resource for this kingdom not found.', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([]);
  });
  await expect(
    resourceService.updateResource({ kingdomID: 1 })
  ).rejects.toStrictEqual({
    error: 'UpdateResource failed. Resource for this kingdom not found.',
  });
});

test('UpdateResource - Resource update is ok', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([
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
    ]);
  });
  updateResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve();
  });
  await expect(resourceService.updateResource({ kingdomID: 1 })).toStrictEqual(
    Promise.resolve({})
  );
});

//CreateResource Tests

test('CreateResource - Creation failed. Kingdom ID is required.', async () => {
  await expect(resourceService.createResource({})).rejects.toStrictEqual({
    error: 'Kingdom ID is required.',
  });
});

test('CreateResource - Creation failed. Resource for this kingdom already exists.', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([
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
    ]);
  });
  await expect(
    resourceService.createResource({ kingdomID: 1 })
  ).rejects.toStrictEqual({
    error:
      'InsertResource stopped. Resource for this Kingdom ID already exists.',
  });
});

test('CreateResource - Creation failed. InsertResource failed.', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([]);
  });

  insertResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([]);
  });

  await expect(
    resourceService.createResource({ kingdomID: 1 })
  ).rejects.toStrictEqual({
    error: 'InsertResource failed.',
  });
});

test('CreateResource - Creation success.', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([]);
  });

  insertResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([{ insertId: 1 }]);
  });

  await expect(resourceService.createResource({ kingdomID: 1 })).toStrictEqual(
    Promise.resolve({
      message: 'InsertResource successful',
    })
  );
});
