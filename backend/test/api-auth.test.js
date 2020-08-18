import request from 'supertest';

jest.mock('../src/services/authService');
import { authService } from '../src/services/authService';
import app from '../src/app';

class AuthenticationError extends Error {
  constructor(message) {
    super();
    this.error = message;
  }
}

test('no token should response with 401', done => {
  authService.mockImplementation(() => {
    throw new AuthenticationError('No token provided.');
  });
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('No token provided.');
      return done();
    });
});

test('invalid token should response with 401', done => {
  authService.mockImplementation(() => {
    throw new AuthenticationError('Invalid token.');
  });
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'invalidtoken')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('Invalid token.');
      return done();
    });
});

test('valid token should response with 200 and result', done => {
  authService.mockImplementation(() => ({
    userId: '44',
    kingdomId: '26',
  }));
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'validtoken')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toEqual({
        userId: '44',
        kingdomId: '26',
      });
      return done();
    });
});
