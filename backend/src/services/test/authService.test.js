import { authService } from '../authService';
jest.mock('jsonwebtoken');
import jwt from 'jsonwebtoken';

test('without token throw error', async () => {
  jwt.verify.mockImplementation(() => {
    throw new Error();
  });
  try {
    await authService();
  } catch (err) {
    expect(err.error).toBe('No token provided.');
  }
});

test('invalid token error', async () => {
  jwt.verify.mockImplementation(() => {
    throw new Error();
  });
  try {
    await authService('23rf4g3wgw5z54hdtzj');
  } catch (err) {
    expect(err.error).toBe('Invalid token.');
  }
});

test('valid token should be resolved', async () => {
  jwt.verify.mockImplementation(() => {
    return {
      userID: '21',
      kingdomID: '5',
    };
  });
  const result = await authService('valid token');
  expect(result).toEqual({
    userId: '21',
    kingdomId: '5',
  });
});
