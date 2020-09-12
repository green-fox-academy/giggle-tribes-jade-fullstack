import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';
db.query.mockImplementation( () => (
  { results: [
    { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
    { id: 2, kingdom_id: 3, type: 'gold', amount: 20, generation: 25, updatedAt: '2020-08-15 13:04:53' }
  ] }
));

test('post: missing token returns error 112', done => {
  request(app)
    .post('/api/kingdoms/7/troops')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("112");
      return done();
    });
});

test('post: invalid kingdomId returns error 204', done => {
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .post('/api/kingdoms/invalid/troops')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("204");
      return done();
    });
});

test('post: valid kingdomId but not enough gold returns error "Not enough gold."', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 5, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .post('/api/kingdoms/7/troops')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Not enough gold.");
      return done();
    });
});

test('post: valid kingdomId and enough gold returns troop object', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 220, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .post('/api/kingdoms/7/troops')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, data) => {
      if (err) return done(err);
      const result = data.body;
      result.started_at = '2020-08-19 19:06:22';
      result.finished_at = '2020-08-19 19:06:22';
      expect(result).toEqual({
        'finished_at': '2020-08-19 19:06:22', 'hp': 1, 'kingdomId': '7', 'level': 1, 'started_at': '2020-08-19 19:06:22', 'attack': 1, 'defence': 1
      });
      return done();
    });
});

test('get: invalid kingdomId returns error 204', done => {
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .get('/api/kingdoms/invalid/troops')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("204");
      return done();
    });
});

test('get: valid kingdomId returns object', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 220, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .get('/api/kingdoms/7/troops')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, data) => {
      if (err) return done(err);
      const result = data.body;
      expect(typeof result).toBe("object");
      return done();
    });
});
