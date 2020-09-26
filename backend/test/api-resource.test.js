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

test('missing token returns error "Token is required."', done => {
  request(app)
    .get('/api/kingdoms/3/resource')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Token is required.");
      return done();
    });
});

test('unmatched kingdomId returns error "Unauthorized for this kingdom."', done => {
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .get('/api/kingdoms/999/resource')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(403)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Unauthorized for this kingdom.");
      return done();
    });
});

test('invalid kingdomId returns error "Invalid kingdomId."', done => {
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .get('/api/kingdoms/3/resource')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Invalid kingdomId.");
      return done();
    });
});

test('valid kingdomId returns resource object', done => {
  db.query.mockImplementation( () => (
    { results: [
      { id: 1, kingdom_id: 3, type: 'food', amount: 5, generation: 10, updatedAt: '2020-08-15 13:04:53' },
      { id: 2, kingdom_id: 3, type: 'gold', amount: 20, generation: 25, updatedAt: '2020-08-15 13:04:53' }
    ] }
  ));
  request(app)
    .get('/api/kingdoms/3/resource')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toEqual({ resources: [
        {"amount": 5, "generation": 10, "type": "food", "updatedAt": "2020-08-15 13:04:53"},
        {"amount": 20, "generation": 25, "type": "gold", "updatedAt": "2020-08-15 13:04:53"}
      ]});
      return done();
    });
});

