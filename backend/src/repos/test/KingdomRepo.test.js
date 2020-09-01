import { KingdomRepo } from '../../repos';
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

const kingdom = new KingdomRepo(db,errorCodes);

test('get: missing kingdomId returns error 104', async () => {
    try {
      const result = await kingdom.get({});
    } catch(err) {
      expect(err).toStrictEqual( Error(104) );
    }
});

test('get: invalid kingdomId (zero result) returns error 204', async () => {
    const db = {
        query: (...query) => {
            return {
                results: []
            }
        }
      };
    const kingdom = new KingdomRepo(db,errorCodes);
    try {
      const result = await kingdom.get({kingdomId:1});
    } catch(err) {
      expect(err).toStrictEqual( Error(204) );
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

test('add: missing kingdomName returns error 105', async () => {
  try {
    const result = await kingdom.add({});
  } catch(err) {
    expect(err).toStrictEqual( Error(105) );
  }
});

test('add: valid kingdomName returns db query with params', async () => {
  const result = await kingdom.add({kingdomName: 'MockedKingdom'});
  expect(result).toStrictEqual({
    query: `INSERT INTO kingdoms (name) VALUES(?)`,
    params: [ 'MockedKingdom' ]
  });
});

test('attachUser: missing kingdomId returns error 104', async () => {
  try {
    const result = await kingdom.attachUser({userId: 1});
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('attachUser: missing userId returns error 103', async () => {
  try {
    const result = await kingdom.attachUser({kingdomId: 1});
  } catch(err) {
    expect(err).toStrictEqual( Error(103) );
  }
});

test('add: valid kingdomId and userId returns db query with params', async () => {
  const result = await kingdom.attachUser({userId: 1, kingdomId : 2});
  expect(result).toStrictEqual({
    query: `INSERT INTO users_kingdoms (user_id,kingdom_id) VALUES(?,?)`,
    params: [ 1, 2 ]
  });
});

