import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';
db.query.mockImplementation( () => (
  { results: [{ userId: 2, kingdomId: 3 }] }
));

test('post: missing location returns error "Missing locationCode."', done => {
  request(app)
    .post('/api/kingdoms/1/map')
    .set('Accept', 'application/json')
    .send({})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Missing locationCode.");
      return done();
    });
});

test('post: already used location returns error "Location is already taken."', done => {
  db.query.mockImplementation( () => (
    { results: [{ location: 'TST' }] }
  ));
  request(app)
    .post('/api/kingdoms/1/map')
    .set('Accept', 'application/json')
    .send({country_code: 'TST'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Location is already taken.");
      return done();
    });
});

test('post: invalid kingdomId returns error "Invalid kingdomId."', done => {
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .post('/api/kingdoms/1/map')
    .set('Accept', 'application/json')
    .send({country_code: 'TST'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Invalid kingdomId.");
      return done();
    });
});

test('post: already located kingdomId returns error "Kingdom is already located."', done => {
  db.query.mockImplementation( () => (
    { results: [{location: 'ABC'}] }
  ));
  request(app)
    .post('/api/kingdoms/1/map')
    .set('Accept', 'application/json')
    .send({country_code: 'TST'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Kingdom is already located.");
      return done();
    });
});

test('post: proper data returns kingdom object', done => {
  db.query.mockImplementation( () => (
    { results: [{location: null}]  }
  ));
  request(app)
    .post('/api/kingdoms/23/map')
    .set('Accept', 'application/json')
    .send({country_code: 'TST'})
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.location).toEqual({
        "country_code": "TST"
      });
      return done();
    });
});

test('getById: invalid kingdomId returns error "Invalid kingdomId."', done => {
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .get('/api/kingdoms/1/map')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Invalid kingdomId.");
      return done();
    });
});

test('getById: valid kingdomId returns kingdom object', done => {
  db.query.mockImplementation( () => (
    { results: [{location: 'TST'}]  }
  ));
  request(app)
    .get('/api/kingdoms/1/map')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.location).toEqual({
        "country_code": "TST"
      });
      return done();
    });
});

test('get: returns kingdoms object', done => {
  db.query.mockImplementation( () => (
    { results: [
      {kingdomId: 1, kingdomName: 'testkingdom', location: 'TST'},
      {kingdomId: 2, kingdomName: 'second', location: '2TH'}
    ]}
  ));
  request(app)
    .get('/api/kingdoms/map')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toEqual({ kingdoms: [
        {kingdomId: 1, kingdomName: 'testkingdom', location: 'TST'},
        {kingdomId: 2, kingdomName: 'second', location: '2TH'}
      ]});
      return done();
    });
});
