import { UserRepo } from '../../repos';

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

const user = new UserRepo(db);

test('add: missing username returns error 1', async () => {
    try {
      const result = await user.add({password:'secret'});
    } catch(err) {
      expect(err).toStrictEqual( Error(1) );
    }
});

test('add: missing password returns error 3', async () => {
    try {
      const result = await user.add({name:'username'});
    } catch(err) {
      expect(err).toStrictEqual( Error(3) );
    }
});

test('add: too short password returns error 4', async () => {
    try {
      const result = await user.add({name:'username',password:'pass'});
    } catch(err) {
      expect(err).toStrictEqual( Error(4) );
    }
});

test('add: valid userdata returns db query with params', async () => {
    const result = await user.add({name:'username',password:'secretpassword'});
    expect(result).toStrictEqual({
        query: 'INSERT INTO users (name,password) VALUES(?,?)',
        params: [ 'username', 'secretpassword' ]
    });
});

test('add: username already in use returns error 2', async () => {
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
    const user = new UserRepo(db);
    try {
        const result = await user.add({name:'username',password:'secretpassword'});
    } catch(err) {
        expect(err).toStrictEqual( Error(2) );
    }
});

test('get: valid username returns db query with params', async () => {
    const result = await user.getByName({name:'username'});
    expect(result).toStrictEqual({
        query: 'SELECT * FROM users WHERE name=?',
        params: [ 'username' ]
    });
});

test('get: missing username returns error 1', async () => {
    try {
        const result = await user.getByName({});
    } catch(err) {
      expect(err).toStrictEqual( Error(1) );
    }
});

test('get: valid userId returns db query with params', async () => {
    const result = await user.getById({id: 1});
    expect(result).toStrictEqual({
        query: 'SELECT * FROM users WHERE id=?',
        params: [ 1 ]
    });
});

test('get: missing userId returns error 5', async () => {
    try {
        const result = await user.getById({});
    } catch(err) {
      expect(err).toStrictEqual( Error(5) );
    }
});

test('get: invalid userId (zero result) returns error 6', async () => {
    const db = {
        query: (...query) => {
            return {
                results: []
            }
        }
      };
    const user = new UserRepo(db);
    try {
        const result = await user.getById({id: 1});
    } catch(err) {
      expect(err).toStrictEqual( Error(6) );
    }
});
