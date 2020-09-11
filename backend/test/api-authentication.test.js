import request from 'supertest';
import app from '../src/app';

test('post: missing token returns error 112', done => {
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('112');
      return done();
    });
});

test('post: invalid token returns error 212', done => {
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'invalidtoken')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.error).toBe('212');
      return done();
    });
});

test('valid token returns object', done => {
  request(app)
    .post('/api/auth')
    .set('Accept', 'application/json')
    .set('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toEqual({
        userId: 1,
        kingdomId: 3,
      });
      return done();
    });
});
