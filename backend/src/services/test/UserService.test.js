import { UserService } from '../../services';
import { errorCodes, UserRepo, KingdomRepo } from '../../repos';

const db = {
  query: (...query) => {
    return {
      results: {
        query: query[0],
        params: query[1],
        insertId: 4,
      },
    };
  },
};

const resourceService = {
  async add() {
    return 'success';
  },
};
const buildingService = {
  async add() {
    return 'success';
  },
};
const userRepo = new UserRepo(db, errorCodes);
const kingdomRepo = new KingdomRepo(db, errorCodes);
const user = new UserService({
  userRepo,
  kingdomRepo,
  resourceService,
  buildingService,
  errorCodes,
});

test('add: missing username and password returns error 110', async () => {
  try {
    await user.add({ kingdomName: 'kingdom' });
  } catch (err) {
    expect(err).toStrictEqual(Error(110));
  }
});

test('add: missing username returns error 101', async () => {
  try {
    await user.add({ password: 'secret', kingdomName: 'kingdom' });
  } catch (err) {
    expect(err).toStrictEqual(Error(101));
  }
});

test('add: missing password returns error 102', async () => {
  try {
    await user.add({ userName: 'username', kingdomName: 'kingdom' });
  } catch (err) {
    expect(err).toStrictEqual(Error(102));
  }
});

test('add: invalid password returns error 202', async () => {
  try {
    await user.add({
      userName: 'username',
      password: 'secret',
      kingdomName: 'kingdom',
    });
  } catch (err) {
    expect(err).toStrictEqual(Error(202));
  }
});

test('add: missing kingdomname returns error 105', async () => {
  try {
    await user.add({ userName: 'username', password: 'secret78' });
  } catch (err) {
    expect(err).toStrictEqual(Error(105));
  }
});

test('add: valid userdata returns valid result', async () => {
  const result = await user.add({
    userName: 'username',
    password: 'secretpassword',
    kingdomName: 'kingdom',
  });
  expect(result).toStrictEqual({
    id: 4,
    username: 'username',
    kingdomId: 4,
  });
});

test('add: username already in use returns error 301', async () => {
  class duplicateError extends Error {
    constructor() {
      super();
      this.code = 'ER_DUP_ENTRY';
    }
  }
  const db = {
    query: (...query) => {
      throw new duplicateError();
    },
  };
  const userRepo = new UserRepo(db, errorCodes);
  const resourceService = {};
  const kingdomRepo = new KingdomRepo(db, errorCodes);
  const user = new UserService({
    userRepo,
    kingdomRepo,
    resourceService,
    errorCodes,
  });
  try {
    await user.add({
      userName: 'username',
      password: 'secretpassword',
      kingdomName: 'kingdom',
    });
  } catch (err) {
    expect(err).toStrictEqual(Error(301));
  }
});
