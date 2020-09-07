import { SessionService } from '../../services';
import { UserRepo } from '../../repos';
import { errorCodes } from '../../repos';

const db = {
    query: (...query) => {
        return {
            results: [{
                userId: 1,
                kingdomId: 3
            }]
        };
    }
  };

const session = new SessionService({UserRepo,db,errorCodes});

test('login: missing username and password returns error 110', async () => {
    try {
      const result = await session.login({});
    } catch(err) {
      expect(err).toStrictEqual( Error(110) );
    }
});

test('login: missing username returns error 101', async () => {
  try {
    const result = await session.login({password:'password'});
  } catch(err) {
    expect(err).toStrictEqual( Error(101) );
  }
});

test('login: missing password returns error 102', async () => {
  try {
    const result = await session.login({userName:'username'});
  } catch(err) {
    expect(err).toStrictEqual( Error(102) );
  }
});

test('login: invalid username or password returns error 210', async () => {
  const db = {
    query: (...query) => {
        return {
            results: []
        };
    }
  };
  const session = new SessionService({UserRepo,db,errorCodes});
  try {
    const result = await session.login({userName:'username', password:'password'});
  } catch(err) {
    expect(err).toStrictEqual( Error(210) );
  }
});

test('login: valid username and password returns token', async () => {
    const result = await session.login({userName:'username', password:'password'});
    let token = result.split('');
    token.length = 20;
    token = token.join('');
    expect(token).toBe('eyJhbGciOiJIUzI1NiIs');
});

test('verifyToken: missing token returns error 112', async () => {
  try {
    const result = session.verifyToken({});
  } catch(err) {
    expect(err).toStrictEqual( Error(112) );
  }
});

test('verifyToken: invalid token returns error 212', async () => {
  try {
    const result = session.verifyToken({token: 'eyJhbGciOiJIUzI1NiIs'});
  } catch(err) {
    expect(err).toStrictEqual( Error(212) );
  }
});

test('verifyToken: valid token returns object', async () => {
  const result = session.verifyToken({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImtpbmdkb21JZCI6MywiaWF0IjoxNTk5NTEyMDU3fQ.L-8Eim9d_jd55V2BKGzHbNnjGXTiAFMPaDRWCkJ6RbE'});
  expect(result).toStrictEqual({"kingdomId": 3, "userId": 1});
});

