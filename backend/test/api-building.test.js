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
    .post('/api/kingdoms/3/buildings')
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
    .post('/api/kingdoms/invalid/buildings')
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

test('post: missing buildingType returns error "Building type is required."', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 20, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .post('/api/kingdoms/invalid/buildings')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Building type is required.");
      return done();
    });
});

test('post: invalid buildingType returns error "Wrong building type."', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 20, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .post('/api/kingdoms/invalid/buildings')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .send({type: 'invalid type'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Wrong building type.");
      return done();
    });
});

test('valid kingdomId and buildingType but not enough gold returns error "Not enough gold."', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 20, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .post('/api/kingdoms/3/buildings')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .send({type: 'farm'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Not enough gold.");
      return done();
    });
});

test('valid kingdomId and buildingType and enough gold returns building object', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 220, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .post('/api/kingdoms/3/buildings')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .send({type: 'farm'})
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, data) => {
      if (err) return done(err);
      const result = data.body;
      result.started_at = '2020-08-19 19:06:22';
      result.finished_at = '2020-08-19 19:06:22';
      expect(result).toEqual({
        'finished_at': '2020-08-19 19:06:22', 'hp': 1, 'kingdomId': '3', 'level': 1, 'started_at': '2020-08-19 19:06:22', 'type': 'farm'
      });
      return done();
    });
});
