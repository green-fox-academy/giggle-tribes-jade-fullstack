import request from 'supertest';

import app from '../src/app';
import { getResourceForKingdom } from '../src/repos/resource';
import {
  getTroopsForKingdom,
  insertTroopForKingdom,
} from '../src/repos/troops';
jest.mock('../src/repos/resource');
jest.mock('../src/repos/troops');
jest.mock('../src/services/authService');
import { authService } from '../src/services/authService';

authService.mockImplementation(() => ({
  userId: '44',
  kingdomId: '26',
}));

test('not enough money should response with 400', done => {
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
        amount: 9,
        generation: 1,
        updatedAt: '2020-07-04T08:45:00.000Z',
      },
    ]);
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

test('not enough capacity should response with 400', done => {
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
  getTroopsForKingdom.mockImplementation(async () => {
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

test('enough capacity and money should response with 200', done => {
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
  getTroopsForKingdom.mockImplementation(async () => {
    return Promise.resolve(new Array(1));
  });

  insertTroopForKingdom.mockImplementation(async () => {
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
