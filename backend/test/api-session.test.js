import request from 'supertest';
import app from '../src/app';

jest.mock('../src/data/connection');
import { db } from '../src/data/connection';
db.query.mockImplementation( () => (
  { results: [{ userId: 2, kingdomId: 3 }] }
));

test('missing username and password returns error 110', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({})
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("110");
      return done();
    });
});

test('missing username returns error 101', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({password:'password'})
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("101");
      return done();
    });
});

test('missing password returns error 102', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({username:'superuser'})
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("102");
      return done();
    });
});

test('invalid data returns error 210', done => {
  db.query.mockImplementation( () => (
    { results: [] }
  ));
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'password'})
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe("210");
      return done();
    });
});

test('proper data returns token', done => {
  db.query.mockImplementation( () => (
    { results: [{ userId: 2, kingdomId: 3 }] }
  ));
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({username:'superuser',password:'password'})
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      let token = data.body.split('');
      token.length = 50;
      token = token.join('');
      expect(token).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO');
      return done();
    });
});
