import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';
db.query.mockImplementation( () => (
  { results: { insertId: 4 } }
));

class duplicateError extends Error {
  constructor() {
      super();
      this.code = 'ER_DUP_ENTRY'
  };
};

test('missing username and password returns error 110', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("110");
      return done();
    });
});

test('missing username returns error 101', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({password:'password',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("101");
      return done();
    });
});

test('missing password returns error 102', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("102");
      return done();
    });
});

test('missing kingdomname returns error 105', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'password'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("105");
      return done();
    });
});

test('too short password returns error 202', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'secret',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("202");
      return done();
    });
});

test('username already in use returns error 301', done => {
  db.query.mockImplementation( () => {throw new duplicateError;} );
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'password',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("301");
      return done();
    });
});

test('proper data returns object', done => {
  db.query.mockImplementation( () => (
    { results: { insertId: 4 } }
  ));
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'password',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, data) => {
      console.log(data.body.error)
      if (err) return done(err);
      console.log(data.body.error)
      expect(data.body).toEqual({
        'id' : 4,
        'username' : 'superuser',
        'kingdomId' : 4
      });
      return done();
    });
});
