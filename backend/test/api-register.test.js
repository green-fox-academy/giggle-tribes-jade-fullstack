import request from 'supertest';

jest.mock('../src/repos/userRepo');
import { userRepo } from '../src/repos/userRepo';
import app from '../src/app';
import {
  getResourceForKingdom,
  insertResourceForKingdom,
} from '../src/repos/resource';
jest.mock('../src/repos/resource');

class validationError extends Error {
  constructor() {
    super();
    this.validationError = `This is a mocked error.`;
  }
};
userRepo.add.mockImplementation( () => {
  throw new validationError();
});
getResourceForKingdom.mockImplementation(async () => {
  return Promise.resolve([]);
});

insertResourceForKingdom.mockImplementation(async () => {
  return Promise.resolve([{ insertId: 1 }]);
});

test('should respond with handled error', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send({ username: 'username', password: 'password' })
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('This is a mocked error.');
      return done();
    });
});
