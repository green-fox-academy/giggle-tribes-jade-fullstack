import { UserRepo } from '../../repos';
import { errorCodes } from '../../repos';

const db = {
    query: (...query) => {
        return {
            results: {
                query: query[0],
                params: query[1]
            }
        }
    }
  };

const user = new UserRepo(db,errorCodes);

test('add: missing username returns error 101', async () => {
    try {
      const result = await user.add({password:'secret'});
    } catch(err) {
      expect(err).toStrictEqual( Error(101) );
    }
});

test('add: missing password returns error 102', async () => {
    try {
      const result = await user.add({userName:'username'});
    } catch(err) {
      expect(err).toStrictEqual( Error(102) );
    }
});

test('add: too short password returns error 202', async () => {
    try {
      const result = await user.add({userName:'username',password:'pass'});
    } catch(err) {
      expect(err).toStrictEqual( Error(202) );
    }
});

test('add: valid userdata returns db query with params', async () => {
    const result = await user.add({userName:'username',password:'secretpassword'});
    expect(result).toStrictEqual({
        query: 'INSERT INTO users (name,password) VALUES(?,?)',
        params: [ 'username', 'secretpassword' ]
    });
});

test('add: username already in use returns error 301', async () => {
    class duplicateError extends Error {
        constructor() {
            super();
            this.code = 'ER_DUP_ENTRY'
        };
    };
    const db = {
        query: (...query) => {
            throw new duplicateError;
        }
    };
    const user = new UserRepo(db,errorCodes);
    try {
        const result = await user.add({userName:'username',password:'secretpassword'});
    } catch(err) {
        expect(err).toStrictEqual( Error(301) );
    }
});

test('get: valid username returns db query with params', async () => {
    const result = await user.getByName({userName:'username'});
    expect(result).toStrictEqual({
        query: 'SELECT * FROM users WHERE name=?',
        params: [ 'username' ]
    });
});

test('get: missing username returns error 101', async () => {
    try {
        const result = await user.getByName({});
    } catch(err) {
      expect(err).toStrictEqual( Error(101) );
    }
});

test('get: valid userId returns db query with params', async () => {
    const result = await user.getById({userId: 1});
    expect(result).toStrictEqual({
        query: 'SELECT * FROM users WHERE id=?',
        params: [ 1 ]
    });
});

test('get: missing userId returns error 103', async () => {
    try {
        const result = await user.getById({});
    } catch(err) {
      expect(err).toStrictEqual( Error(103) );
    }
});

test('get: invalid userId (zero result) returns error 203', async () => {
    const db = {
        query: (...query) => {
            return {
                results: []
            }
        }
      };
    const user = new UserRepo(db,errorCodes);
    try {
        const result = await user.getById({userId: 1});
    } catch(err) {
      expect(err).toStrictEqual( Error(203) );
    }
});

test('getAuthentication: missing userName returns error 101', async () => {
    const user = new UserRepo(db,errorCodes);
    try {
        const result = await user.getAuthentication({password: 'password'});
    } catch(err) {
      expect(err).toStrictEqual( Error(101) );
    }
});

test('getAuthentication: missing password returns error 102', async () => {
    const user = new UserRepo(db,errorCodes);
    try {
        const result = await user.getAuthentication({userName: 'name'});
    } catch(err) {
      expect(err).toStrictEqual( Error(102) );
    }
});

test('getAuthentication: invalid userName or password returns error 210', async () => {
    const db = {
        query: (...query) => {
            return {
                results: []
            }
        }
      };
    const user = new UserRepo(db,errorCodes);
    try {
        const result = await user.getAuthentication({userName: 'name',password:'password'});
    } catch(err) {
      expect(err).toStrictEqual( Error(210) );
    }
});

test('getAuthentication: valid userName and password returns db query with params', async () => {
    const result = await user.getAuthentication({userName: 'name',password:'password'});
    expect(result).toStrictEqual({
        query: `
        SELECT
            users.id userId,
            users_kingdoms.kingdom_id kingdomId 
        FROM users 
        LEFT JOIN users_kingdoms ON users.id = users_kingdoms.user_id
        WHERE users.name=? AND users.password=?
        `,
        params: [ 'name', 'password' ]
      });
});
