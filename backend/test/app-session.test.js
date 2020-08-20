import request from 'supertest';

import app from '../src/app';
import { getToken } from '../src/services/tokenService';
jest.mock('../src/services/tokenService');
import { userService } from '../src/services/userService';
jest.mock('../src/services/userService');
import { resourceService } from '../src/services/resourceService';
jest.mock('../src/services/resourceService');

test('should respond with 401 - Password is required.', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ username: 'dummy_username' })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Password is required.');
      return done();
    });
});

test('should respond with 401 - Username is required.', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ password: 'dummy_password' })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Username is required.');
      return done();
    });
});

test('should respond with 401 - All fields are required.', done => {
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('All fields are required.');
      return done();
    });
});

test('should respond with 401 - Username or password is incorrect.', done => {
  userService.get.mockImplementation(async () => {
    throw { error: 'Username or password is incorrect.' };
  });
  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ username: 'dummy_username', password: 'dummy_password' })
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Username or password is incorrect.');
      return done();
    });
});

test('should respond with 401 - Username and password are correct.', done => {
  userService.get.mockImplementation(async () => {
    return Promise.resolve([
      { userID: 1, kindomID: 1 }
    ]);
  });

  getToken.mockImplementation(async () => {
    return Promise.resolve(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTU5MzM2Mzc3Mn0.NH561vc3u6ic2YO64Xyw25DIJ7UWjPdFL-JA561Srw8'
    );
  });

  request(app)
    .post('/api/sessions')
    .set('Accept', 'application/json')
    .send({ username: 'dummy_username', password: 'dummy_password' })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.token).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTU5MzM2Mzc3Mn0.NH561vc3u6ic2YO64Xyw25DIJ7UWjPdFL-JA561Srw8'
      );
      return done();
    });
});
