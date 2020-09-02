import { LocationRepo } from '../../repos';
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

const location = new LocationRepo(db,errorCodes);

test('add: missing kingdomId returns error 104', async () => {
    try {
      const result = await location.add({locationCode:'GBR'});
    } catch(err) {
      expect(err).toStrictEqual( Error(104) );
    }
});

test('add: missing code returns error 109', async () => {
  try {
    const result = await location.add({kingdomId: 1});
  } catch(err) {
    expect(err).toStrictEqual( Error(109) );
  }
});

test('add: invalid code (too short) returns error 209', async () => {
  try {
    const result = await location.add({kingdomId: 1, locationCode:'GB'});
  } catch(err) {
    expect(err).toStrictEqual( Error(209) );
  }
});

test('add: valid kingdomId and code returns db query with params', async () => {
  const result = await location.add({kingdomId: 1, locationCode:'GBR'});
  expect(result).toStrictEqual({
    query: `INSERT INTO locations (kingdom_id,code) VALUES(?,?)`,
    params: [ 1, 'GBR' ]
  });
});

test('getByKingdomId: missing kingdomId returns error 104', async () => {
  try {
    const result = await location.getByKingdomId({});
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('getByKingdomId: valid params return db query with params', async () => {
  const result = await location.getByKingdomId({kingdomId: 1});
  expect(result).toStrictEqual({
    query: `SELECT * FROM locations WHERE kingdom_id = ?`,
    params: [ 1 ]
  });
});

