import request from 'supertest';

import app from '../src/app';
import { resourceService } from '../src/services/resourceService';
jest.mock('../src/services/resourceService');
import { authService } from '../src/services/authService';
jest.mock('../src/services/authService');
import { troopsRepo } from '../src/repos/TroopsRepo';
jest.mock('../src/repos/TroopsRepo');

authService.mockImplementation(() => ({
  userId: '44',
  kingdomId: '26',
}));

describe('GET /troops', () => {
  test('should respond with 200', done => {
    troopsRepo.get.mockImplementation(async () => {
      return Promise.resolve([
        {
          id: 1,
        },
        {
          id: 2,
        },
      ]);
    });

    request(app)
      .get('/api/kingdoms/3/troops')
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({ troops: [{ id: 1 }, { id: 2 }] });
        return done();
      });
  });
});

describe('POST /troops', () => {
  test('not enough money should respond with 400', done => {
    resourceService.getResource.mockImplementation(async () => {
      return await Promise.resolve({
        resources: [
          {
            type: 'gold',
            amount: 9,
          },
        ],
      });
    });

    troopsRepo.get.mockImplementation(async () => {
      return Promise.resolve([]);
    });

    request(app)
      .post('/api/kingdoms/1/troops')
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe("You don't have enough money.");
        return done();
      });
  });

  test('not enough capacity should respond with 400', done => {
    resourceService.getResource.mockImplementation(async () => {
      return Promise.resolve({
        resources: [
          {
            type: 'gold',
            amount: 500,
          },
        ],
      });
    });

    troopsRepo.get.mockImplementation(async () => {
      return Promise.resolve(new Array(100));
    });

    request(app)
      .post('/api/kingdoms/1/troops')
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe(
          'You reached the storage limit, upgrade Townhall first.'
        );
        return done();
      });
  });

  test('enough capacity and money should respond with 200', done => {
    resourceService.getResource.mockImplementation(async () => {
      return Promise.resolve({
        resources: [
          {
            type: 'gold',
            amount: 500,
          },
        ],
      });
    });

    troopsRepo.get.mockImplementation(async () => {
      return Promise.resolve(new Array(1));
    });

    troopsRepo.insert.mockImplementation(async () => {
      return Promise.resolve({ insertId: 3 });
    });

    const mockDate = new Date(0);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    request(app)
      .post('/api/kingdoms/1/troops')
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({
          id: 3,
          level: 1,
          hp: 1,
          attack: 1,
          defence: 1,
          started_at: '1970-01-01T00:01:00.000Z',
          finished_at: '1970-01-01T00:01:00.000Z',
        });
        return done();
      });
  });
});
