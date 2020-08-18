import { resourceMiddleware } from './resourceMiddleware';
import { getResourceForKingdom } from '../repos/resource';
jest.mock('../repos/resource');
import { resourceService } from '../services/resourceService';
jest.mock('../services/resourceService');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('Resource Middleware takes 3 arguments', async () => {
  await expect(resourceMiddleware.length).toBe(3);
});
test('Resource Middleware is a function', async () => {
  await expect(resourceMiddleware).toBeInstanceOf(Function);
});

test('Update failed. Kingdom ID is required.', async () => {
  resourceService.updateResource.mockImplementation(() => { throw new Error ('KingdomId is required.') });
  const req = { params: {} };
  const res = mockResponse();
  const next = jest.fn();
  await resourceMiddleware(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: 'KingdomId is required.',
  });
  expect(next).not.toHaveBeenCalled();
});

test('Update failed. Resource for this kingdom not found.', async () => {
  resourceService.updateResource.mockImplementation(() => { throw new Error ('UpdateResource failed. Resource for this kingdom not found.') });
  const req = { params: { kingdomID: 1 } };
  const res = mockResponse();
  const next = jest.fn();
  await resourceMiddleware(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: 'UpdateResource failed. Resource for this kingdom not found.',
  });
  expect(next).not.toHaveBeenCalled();
});

test('Resource Middleware is ok and next is called', async () => {
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
  resourceService.updateResource.mockImplementation(() => { message: 'UpdateResource successful' });
  const req = { params: { kingdomID: 1 } };
  const res = {};
  const next = jest.fn();
  await resourceMiddleware(req, res, next);
  expect(next).toHaveBeenCalled();
  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toBeCalledWith();
});

