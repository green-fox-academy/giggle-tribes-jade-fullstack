import { userService } from './userService';
jest.mock('../repos/userRepo');
jest.mock('../repos/kingdomRepo');
import { userRepo } from '../repos/userRepo';
import { kingdomRepo } from '../repos/kingdomRepo';



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
  userRepo.add.mockImplementation( () => {
    throw new ExistingUserError();
  });
  try {
    await userService.add(input);
  } catch(err) {
    expect(err).toBe('Username is already taken.');
  }
});

test('new user and kingdom added', async () => {
  userRepo.add.mockImplementation( () => 2 );
  kingdomRepo.add.mockImplementation( () => 3 );
  const result = await userService.add(input);
  expect(result).toEqual({
    "id": 2,
    "kingdomId": 3,
    "username": "username"
  });
});
