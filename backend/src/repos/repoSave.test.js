import { repo } from '../repos/repoHandler';
jest.mock('../data/connection');
import {db} from '../data/connection';

class DuplicationError extends Error {
  constructor() {
    super();
    this.code = "ER_DUP_ENTRY"
  }
};

test('existing user error', async () => {
  db.query.mockImplementation( () => {
    throw new DuplicationError();
  });
  try {
    await repo.save('user', {'username' : 'username', 'password' : 'password'});
  } catch(err) {
    expect(err.duplication).toBe(true);
  }
});

test('user with empty username throws error', async () => {
  try {
    await repo.save('user', {'username' : '', 'password' : 'password'});
  } catch(err) {
    expect(err.validationError).toBe(`The username was not provided.`);
  }
});

test('user with empty password throws error', async () => {
  try {
    await repo.save('user', {'username' : 'username', 'password' : ''});
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
  const result = await repo.save('user', {'username' : 'username', 'password' : 'password'});
  expect(result).toBe(4);
});

test('existing location code error', async () => {
  db.query.mockImplementation( () => {
    throw new DuplicationError();
  });
  try {
    await repo.save('location', {'kingdom_id' : 4, 'code' : 'ABC'});
  } catch(err) {
    expect(err.duplication).toBe(true);
  }
});

test('location with empty kingdom_id throws error', async () => {
  try {
    await repo.save('location', {'kingdom_id' : '', 'code' : 'ABC'});
  } catch(err) {
    expect(err.validationError).toBe(`The kingdom_id was not provided.`);
  }
});

test('location with empty code throws error', async () => {
  try {
    await repo.save('location', {'kingdom_id' : 16, 'code' : ''});
  } catch(err) {
    expect(err.validationError).toBe(`The code was not provided.`);
  }
});

test('location with valid credentials return a number', async () => {
  db.query.mockImplementation( () => {
    return {
      results : {
        insertId : 4
      }
    }
  });
  const result = await repo.save('location', {'kingdom_id' : 4, 'code' : 'ABC'});
  expect(result).toBe(4);
});

