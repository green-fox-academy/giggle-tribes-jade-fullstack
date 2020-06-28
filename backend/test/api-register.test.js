import request from 'supertest';

import app from '../src/app';

test('should respond with handled error', done => {
  request(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      console.log(data.body)
      if (err) return done(err);
      expect(data.body.error).toEqual('Username and password are required.');
      return done();
    });
});
