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

test('missing username and password returns error "Username and password are required."', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Username and password are required.');
      return done();
    });
});

test('missing username returns error "Username is reuired."', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({password:'password',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Username is reuired.");
      return done();
    });
});

test('missing password returns error "Password is required."', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Password is required.");
      return done();
    });
});

test('missing kingdomname returns error "Kingdom name is required."', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'password'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Kingdom name is required.");
      return done();
    });
});

test('too short password returns error "Password is too short."', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'secret',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Password is too short.");
      return done();
    });
});

test('username already in use returns error "Username is already taken."', done => {
  db.query.mockImplementation( () => {throw new duplicateError;} );
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'password',kingdomname:'mockedkingdom'})
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("Username is already taken.");
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
