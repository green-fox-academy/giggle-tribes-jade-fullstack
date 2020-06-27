import { registerService } from './registerService';
jest.mock('../repos/registerData');
import { registerData } from '../repos/registerData';


const input = {
  username: 'username',
  password: 'password',
  kingdomname: 'kingdomname'
};


class existingUserError extends Error {
  constructor() {
    super();
    this.duplication = true;
  }
};
test('existing user error', async () => {
  registerData.mockImplementation( () => {
    throw new existingUserError();
  });
  try {
    await registerService(input);
  } catch(err) {
    expect(err).toBe('Username is already taken.');
  }
});

test('new user and kingdom added', async () => {
  registerData.mockImplementation( () => 2 );
  const result = await registerService(input);
  expect(result).toEqual({
    "id": 2,
    "kingdomId": 2,
    "username": "username"
  });
});
