import { userService } from './userService';
jest.mock('../repos/repoHandler');
import { repo } from '../repos/repoHandler';


const input = {
  username: 'username',
  password: 'password',
  kingdomname: 'kingdomname'
};


class ExistingUserError extends Error {
  constructor() {
    super();
    this.duplication = true;
  }
};
test('existing user error', async () => {
  repo.save.mockImplementation( () => {
    throw new ExistingUserError();
  });
  try {
    await userService.add(input);
  } catch(err) {
    expect(err).toBe('Username is already taken.');
  }
});

test('new user and kingdom added', async () => {
  repo.save.mockImplementation( () => 2 );
  const result = await userService.add(input);
  expect(result).toEqual({
    "id": 2,
    "kingdomId": 2,
    "username": "username"
  });
});
