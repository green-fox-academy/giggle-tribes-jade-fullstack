import { sessionService } from '../services';
import { getUser, getKingdomIdForUser } from '../repos/user';
jest.mock('../repos/user');
import { getToken } from './tokenService';
jest.mock('./tokenService');

test('Password is required.', async () => {
  await expect(
    sessionService.login({ username: 'dummy_username' })
  ).rejects.toStrictEqual({ error: 'Password is required.' });
});

test('Username is required.', async () => {
  await expect(
    sessionService.login({ password: 'dummy_password' })
  ).rejects.toStrictEqual({
    error: 'Username is required.',
  });
});

test('All fields are required.', async () => {
  await expect(sessionService.login({})).rejects.toStrictEqual({
    error: 'All fields are required.',
  });
});

test('Username or password is incorrect.', async () => {
  getUser.mockImplementation(async () => {
    return Promise.resolve([]);
  });

  await expect(
    sessionService.login({
      username: 'dummy_username',
      password: 'dummy_password',
    })
  ).toStrictEqual(
    Promise.resolve({
      error: 'Username or password is incorrect.',
    })
  );
});

test('Username and password are correct.', async () => {
  getUser.mockImplementation(async () => {
    return Promise.resolve([
      { id: 1, name: 'dummy_username', password: 'dummy_password' },
    ]);
  });
  getKingdomIdForUser.mockImplementation(async () => {
    return Promise.resolve([{ user_ID: 1, kingdom_ID: 1 }]);
  });

  getToken.mockImplementation(async () => {
    return Promise.resolve(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTU5MzM2Mzc3Mn0.NH561vc3u6ic2YO64Xyw25DIJ7UWjPdFL-JA561Srw8'
    );
  });

  const result = await sessionService.login({
    username: 'dummy_username',
    password: 'dummy_password',
  });

  await expect(result).toStrictEqual({
    status: 'ok',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTU5MzM2Mzc3Mn0.NH561vc3u6ic2YO64Xyw25DIJ7UWjPdFL-JA561Srw8',
  });
});
