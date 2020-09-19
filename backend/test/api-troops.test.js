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

const mockDate = new Date(0);
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

const troopFactory = level => {
  return [
    {
      id: 1,
      level: level,
      hp: level,
      attack: level,
      defence: level,
      started_at: mockDate,
      finished_at: mockDate,
    },
  ];
};

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
      return Promise.resolve([
        {
          id: 1,
          level: 1,
          hp: 1,
          attack: 1,
          defence: 1,
          started_at: mockDate,
          finished_at: mockDate,
        },
      ]);
    });

    troopsRepo.insert.mockImplementation(async () => {
      return Promise.resolve({ insertId: 3 });
    });

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

describe('PUT /troops', () => {
  test('no amount should respond with 400', done => {
    request(app)
      .put('/api/kingdoms/1/troops')
      .set('Accept', 'application/json')
      .send({ level: 1 })
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Amount is required.');
        return done();
      });
  });
  test('no level should respond with 400', done => {
    request(app)
      .put('/api/kingdoms/1/troops')
      .set('Accept', 'application/json')
      .send({ amount: 1 })
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Troop level is required.');
        return done();
      });
  });
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
      return Promise.resolve(troopFactory(1));
    });

    request(app)
      .put('/api/kingdoms/1/troops')
      .set('Accept', 'application/json')
      .send({ level: 1, amount: 1 })
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
      return Promise.resolve(troopFactory(1));
    });

    request(app)
      .put('/api/kingdoms/1/troops')
      .set('Accept', 'application/json')
      .send({ level: 2, amount: 1 })
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe(
          'Upgrade is not allowed, academy level too low.'
        );
        return done();
      });
  });

  test('academy level, upgradeble troop amount and money are okay, should respond with 200', done => {
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
      return Promise.resolve(troopFactory(1));
    });

    troopsRepo.update.mockImplementation(async () => {
      return Promise.resolve({ changedRows: 1 });
    });

    request(app)
      .put('/api/kingdoms/1/troops')
      .set('Accept', 'application/json')
      .send({ level: 1, amount: 1 })
      .expect(200)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body).toEqual({
          troops: [
            {
              id: 1,
              level: 1,
              hp: 1,
              attack: 1,
              defence: 1,
              started_at: '1970-01-01T00:02:00.000Z',
              finished_at: '1970-01-01T00:02:00.000Z',
            },
          ],
        });
        return done();
      });
  });
});
