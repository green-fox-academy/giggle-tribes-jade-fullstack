import { authService } from './authService';
const jwt = require('jsonwebtoken');

test('without token throw error', async () => {
  try {
    await authService();
  } catch(err) {
    expect(err.error).toBe('No token provided.');
  }
});

test('invalid token error', async () => {
  try {
    await authService("23rf4g3wgw5z54hdtzj");
  } catch(err) {
    expect(err.error).toBe('Invalid token.');
  }
});

test('valid token should be resolved', async () => {
  const token = await jwt.sign(
    {
      "userId" : "44",
      "kingdomId" : "26"
    },
    "secret"
  );
  const result = await authService(token,"secret");
  expect(result).toEqual({
    "userId" : "44",
    "kingdomId" : "26"
  });
});
