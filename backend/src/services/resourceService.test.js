import { resourceService } from '../services';
import { getResourceForKingdom } from '../repos/resource';
jest.mock('../repos/resource');

test('Kingdom ID is required.', async () => {
  await expect(resourceService.getResource({})).rejects.toStrictEqual({
    error: 'Kingdom ID is required.',
  });
});

test('Resource for this kingdom not found.', async () => {
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([]);
  });

  await expect(
    resourceService.getResource({ kingdomID: '1' })
  ).rejects.toStrictEqual({
    error: 'GetResource failed. Kingdom ID not found.',
  });
});

test('Resource for kingdom found.', async () => {
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

  const result = await resourceService.getResource({
    kingdomID: '1',
  });

  expect(result).toStrictEqual({
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
