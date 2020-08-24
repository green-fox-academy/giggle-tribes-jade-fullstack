import { LocationRepo } from '../../repos';

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

const location = new LocationRepo(db);

test('add: missing kingdomId returns error 1', async () => {
    try {
      const result = await location.add({code:'GBR'});
    } catch(err) {
      expect(err).toStrictEqual( Error(1) );
    }
});

test('add: missing code returns error 2', async () => {
  try {
    const result = await location.add({kingdomId: 1});
  } catch(err) {
    expect(err).toStrictEqual( Error(2) );
  }
});

test('add: invalid code (too short) returns error 3', async () => {
  try {
    const result = await location.add({kingdomId: 1, code:'GB'});
  } catch(err) {
    expect(err).toStrictEqual( Error(3) );
  }
});

test('add: valid kingdomId and code returns db query with params', async () => {
  const result = await location.add({kingdomId: 1, code:'GBR'});
  expect(result).toStrictEqual({
    query: `INSERT INTO locations (kingdom_id,code) VALUES(?,?)`,
    params: [ 1, 'GBR' ]
  });
});

