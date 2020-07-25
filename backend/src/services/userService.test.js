import { userService } from './userService';
import { getUser, getKingdomIdForUser } from '../repos/user';
jest.mock('../repos/user');
import { repo } from '../repos/repoSave';
jest.mock('../repos/repoSave');
import {
  getResourceForKingdom,
  insertResourceForKingdom,
} from '../repos/resource';
jest.mock('../repos/resource');

const input = {
  username: 'username',
  password: 'password',
  kingdomname: 'kingdomname',
};

class ExistingUserError extends Error {
  constructor() {
    super();
    this.duplication = true;
  }
}
test('existing user error', async () => {
  repo.save.mockImplementation(() => {
    throw new ExistingUserError();
  });
  try {
    await userService.add(input);
  } catch (err) {
    expect(err).toBe('Username is already taken.');
  }
});

test('new user and kingdom added', async () => {
  repo.save.mockImplementation(() => 2);
  const result = await userService.add(input);
  expect(result).toEqual({
    id: 2,
    kingdomId: 2,
    username: 'username',
  });
});

test('Username or password is incorrect.', async () => {
  getUser.mockImplementation(async () => {
    return Promise.resolve([]);
  });
  await expect(
    userService.get({ username: 'dummy_username', password: 'dummy_password' })
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
  getResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([]);
  });

  insertResourceForKingdom.mockImplementation(async () => {
    return Promise.resolve([{ insertId: 1 }]);
  });

  await expect(
    userService.get({ username: 'dummy_username', password: 'dummy_password' })
  ).toStrictEqual(
    Promise.resolve({
      userID: 1,
      kindomID: 1,
    })
  );
});
