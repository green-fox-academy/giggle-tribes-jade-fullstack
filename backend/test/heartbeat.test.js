import request from 'supertest';

import app from '../src/app';

test('should respond with db: true', done => {
  request(app)
    .get('/system/heartbeat')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.db).toEqual(true);
      return done();
    });
});
