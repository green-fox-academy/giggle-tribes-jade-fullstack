import { KingdomRepo } from '../../repos';

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

const kingdom = new KingdomRepo(db);

test('get: missing kingdomId returns error 1', async () => {
    try {
      const result = await kingdom.get({});
    } catch(err) {
      expect(err).toStrictEqual( Error(1) );
    }
});

test('get: invalid kingdomId (zero result) returns error 2', async () => {
    const db = {
        query: (...query) => {
            return {
                results: []
            }
        }
      };
    const kingdom = new KingdomRepo(db);
    try {
      const result = await kingdom.get({kingdomId:1});
    } catch(err) {
      expect(err).toStrictEqual( Error(2) );
    }
});

test('get: valid kingdomId returns db query with params', async () => {
  const result = await kingdom.get({kingdomId: 1});
  expect(result).toStrictEqual({
    query: `
        SELECT
            kingdoms.id kingdom_id,
            kingdoms.name kingdom_name,
            users_kingdoms.user_id user_id,
            locations.code location
        FROM kingdoms
        RIGHT JOIN users_kingdoms ON users_kingdoms.kingdom_id = kingdoms.id
        RIGHt JOIN locations ON locations.kingdom_id = kingdoms.id
        WHERE kingdoms.id = ?
        `,
    params: [ 1 ]
  });
});

test('add: missing kingdomName returns error 3', async () => {
  try {
    const result = await kingdom.add({});
  } catch(err) {
    expect(err).toStrictEqual( Error(3) );
  }
});

test('add: valid kingdomName returns db query with params', async () => {
  const result = await kingdom.add({kingdomName: 'MockedKingdom'});
  expect(result).toStrictEqual({
    query: `INSERT INTO kingdoms (name) VALUES(?)`,
    params: [ 'MockedKingdom' ]
  });
});

test('attachUser: missing kingdomId returns error 1', async () => {
  try {
    const result = await kingdom.attachUser({userId: 1});
  } catch(err) {
    expect(err).toStrictEqual( Error(1) );
  }
});

test('attachUser: missing userId returns error 4', async () => {
  try {
    const result = await kingdom.attachUser({kingdomId: 1});
  } catch(err) {
    expect(err).toStrictEqual( Error(4) );
  }
});

test('add: valid kingdomId and userId returns db query with params', async () => {
  const result = await kingdom.attachUser({userId: 1, kingdomId : 2});
  expect(result).toStrictEqual({
    query: `INSERT INTO users_kingdoms (user_id,kingdom_id) VALUES(?,?)`,
    params: [ 1, 2 ]
  });
});

