import request from 'supertest';

import app from '../src/app';
import { getResourceForKingdom } from '../src/repos/resource';
jest.mock('../src/repos/resource');
jest.mock('../src/services/authService');
import { authService } from '../src/services/authService';
jest.mock('../src/services/resourceService');
import { resourceService } from '../src/services/resourceService';
jest.mock('../src/services/resourceService');

authService.mockImplementation(() => ({
  userId: '44',
  kingdomId: '26',
}));

test('should respond with 400 - Resource for this kingdom not found.', done => {
  resourceService.updateResource.mockImplementation(() => { throw new Error ('UpdateResource failed. Resource for this kingdom not found.') });

  request(app)
    .get('/api/kingdoms/1/resource')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, data) => {
      console.log(data.body)
      if (err) return done(err);
      expect(data.body.error).toBe(
        'UpdateResource failed. Resource for this kingdom not found.'
      );
      return done();
    });
});

test('should respond with 200 - Resource for this kingdom found.', done => {
  resourceService.updateResource.mockImplementation( async () => Promise.resolve({ message: 'UpdateResource successful' }));
  resourceService.getResource.mockImplementation( async () => {
    return Promise.resolve({
      resources: [
        {
          type: 'food',
          amount: 500,
          generation: 1,
          updatedAt: '2020-07-04T08:45:00.000Z',
        },
        {
          type: 'gold',
          amount: 500,
          generation: 1,
          updatedAt: '2020-07-04T08:45:00.000Z',
        },
      ],
    });
  });
  

  request(app)
    .get('/api/kingdoms/1/resource')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body).toStrictEqual({
        resources: [
          {
            type: 'food',
            amount: 500,
            generation: 1,
            updatedAt: '2020-07-04T08:45:00.000Z',
          },
          {
            type: 'gold',
            amount: 500,
            generation: 1,
            updatedAt: '2020-07-04T08:45:00.000Z',
          },
        ],
      });
      return done();
    });
});
