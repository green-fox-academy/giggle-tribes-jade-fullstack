import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';

describe('POST/ troops', () => {
  test('post: missing token returns error "Token is required."', done => {
    request(app)
      .post('/api/kingdoms/7/troops')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Token is required.');
        return done();
      });
  });

  test('post: valid kingdomId but not enough gold returns error "Not enough gold."', done => {
    db.query.mockImplementation(() => ({
      results: [
        {
          type: 'gold',
          amount: 5,
          generation: 1,
        },
      ],
    }));
    request(app)
      .post('/api/kingdoms/7/troops')
      .set('Accept', 'application/json')
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Not enough gold.');
        return done();
      });
  });

  test('post: valid kingdomId but not enough gold returns error "Townhall capacity has been exceeded."', done => {
    db.query.mockImplementationOnce(() => ({
      results: [
        { type: 'gold', amount: 220, generation: 1 },
        { type: 'food', amount: 220, generation: 1 },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'gold', amount: 220, generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'food', amount: 220, generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        { type: 'gold', amount: 220, generation: 1 },
        { type: 'food', amount: 220, generation: 1 },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: new Array(100),
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          type: 'townhall',
          level: 1,
        },
      ],
    }));

    request(app)
      .post('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Townhall capacity has been exceeded.');
        return done();
      });
  });

  test('post: valid kingdomId and enough gold returns troop array of objects', done => {
    db.query.mockImplementationOnce(() => ({
      results: [
        { type: 'gold', amount: 220, generation: 1 },
        { type: 'food', amount: 220, generation: 1 },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'gold', amount: 220, generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'food', amount: 220, generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        { type: 'gold', amount: 220, generation: 1 },
        { type: 'food', amount: 220, generation: 1 },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          type: 'townhall',
          level: 1,
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({ results: { insertId: 1 } }));
    db.query.mockImplementation(() => ({
      results: [
        { type: 'gold', amount: 220, generation: 1 },
        { type: 'food', amount: 220, generation: 1 },
      ],
    }));

    request(app)
      .post('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        const result = data.body;
        result.started_at = '2020-08-19 19:06:22';
        result.finished_at = '2020-08-19 19:06:22';
        expect(result).toEqual({
          id: 1,
          kingdom_id: '3',
          level: 1,
          hp: 1,
          attack: 1,
          defence: 1,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:06:22',
        });
        return done();
      });
  });
});

describe('GET/ troops', () => {
  test('get: invalid kingdomId returns error "Invalid kingdomId."', done => {
    db.query.mockImplementation(() => ({ results: [] }));
    request(app)
      .get('/api/kingdoms/invalid/troops')
      .set('Accept', 'application/json')
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Invalid kingdomId.');
        return done();
      });
  });

  test('get: valid kingdomId returns object', done => {
    db.query.mockImplementation(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    request(app)
      .get('/api/kingdoms/7/troops')
      .set('Accept', 'application/json')
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        const result = data.body;
        expect(typeof result).toBe('object');
        return done();
      });
  });
});

describe('PUT/ troops', () => {
  test('put: missing token returns error "Token is required."', done => {
    request(app)
      .put('/api/kingdoms/7/troops')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Token is required.');
        return done();
      });
  });

  test('put: valid kingdomId but missing level returns error "Missing Troop level."', done => {
    request(app)
      .put('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Missing Troop level.');
        return done();
      });
  });

  test('put: valid kingdomId but missing level returns error "Missing amount."', done => {
    request(app)
      .put('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .send({ level: 1 })
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Missing amount.');
        return done();
      });
  });

  test('put: valid kingdomId but not enough gold returns error "Not enough gold."', done => {
    db.query.mockImplementation(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 5,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));

    request(app)
      .put('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .send({ level: 1, amount: 1 })
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Not enough gold.');
        return done();
      });
  });

  test('put: not high enough academy level returns "Academy level is too low."', done => {
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          type: 'academy',
          level: 1,
        },
      ],
    }));

    request(app)
      .put('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .send({ level: 1, amount: 1 })
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Academy level is too low.');
        return done();
      });
  });

  test('put: not enough upgradable troop returns "Not enough troop at this level."', done => {
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          type: 'food',
          amount: 5,
          generation: 10,
          updatedAt: '2020-08-15 13:04:53',
        },
        {
          id: 2,
          kingdom_id: 3,
          type: 'gold',
          amount: 220,
          generation: 25,
          updatedAt: '2020-08-15 13:04:53',
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          type: 'academy',
          level: 2,
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: 3,
          level: 2,
          hp: 1,
          attack: 1,
          defence: 1,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:06:22',
        },
      ],
    }));

    request(app)
      .put('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .send({ level: 1, amount: 1 })
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.error).toBe('Not enough troop at this level.');
        return done();
      });
  });

  test('put: valid kingdomId and enough gold returns troop object', done => {
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'gold', generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'gold', generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'gold', amount: 220 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          type: 'academy',
          level: 2,
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          level: 1,
          hp: 1,
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          changedRows: 1,
        },
      ],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'gold', generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'food', generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'food', generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [{ type: 'gold', generation: 1 }],
    }));
    db.query.mockImplementationOnce(() => ({
      results: [
        {
          id: 1,
          kingdom_id: '3',
          level: 1,
          hp: 1,
          attack: 1,
          defence: 1,
          started_at: '2020-08-19 19:06:22',
          finished_at: '2020-08-19 19:06:22',
        },
      ],
    }));

    request(app)
      .put('/api/kingdoms/3/troops')
      .set('Accept', 'application/json')
      .send({ level: 1, amount: 1 })
      .set(
        'TRIBES_TOKEN',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'
      )
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, data) => {
        if (err) return done(err);
        const result = data.body;

        expect(result).toEqual({
          troops: [
            {
              id: 1,
              kingdom_id: '3',
              level: 1,
              hp: 1,
              attack: 1,
              defence: 1,
              started_at: '2020-08-19 19:06:22',
              finished_at: '2020-08-19 19:06:22',
            },
          ],
        });
        return done();
      });
  });
});
