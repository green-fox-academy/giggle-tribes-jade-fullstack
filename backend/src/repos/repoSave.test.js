import { repo } from '../repos/repoSave';
jest.mock('../data/connection');
import {db} from '../data/connection';


const input = {
  username: 'username',
  password: 'password',
  kingdomname: 'kingdomname'
};

class duplicationError extends Error {
  constructor() {
    super();
    this.code = "ER_DUP_ENTRY"
  }
};
test('existing user error', async () => {
  db.query.mockImplementation( () => {
    throw new duplicationError();
  });
  try {
    await repo.save('user',{'username' : 'username', 'password' : 'password'});
  } catch(err) {
    expect(err.duplication).toBe(true);
  }
});

test('user with empty username throws error', async () => {
  try {
    await repo.save('user',{'username' : '', 'password' : 'password'});
  } catch(err) {
    expect(err.validationError).toBe(`The username was not provided.`);
  }
});

test('user with empty password throws error', async () => {
  try {
    await repo.save('user',{'username' : 'username', 'password' : ''});
  } catch(err) {
    expect(err.validationError).toBe(`The password was not provided.`);
  }
});

test('user with valid credentials return a number', async () => {
  db.query.mockImplementation( () => {
    return {
      results : {
        insertId : 4
      }
    }
  });
  const result = await repo.save('user',{'username' : 'username', 'password' : 'password'});
  expect(result).toBe(4);
});

