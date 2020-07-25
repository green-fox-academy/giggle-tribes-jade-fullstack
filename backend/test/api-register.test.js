import request from 'supertest';

jest.mock('../src/repos/repoSave');
import { repo } from '../src/repos/repoSave';
import app from '../src/app';

class validationError extends Error {
  constructor() {
    super();
    this.validationError = `This is a mocked error.`;
  }
}
repo.save.mockImplementation(() => {
  throw new validationError();
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
