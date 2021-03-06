import { BuildingRepo } from '../../repos';
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

const building = new BuildingRepo(db,errorCodes);

test('add: missing kingdomId returns error 104', async () => {
    try {
      const result = await building.add({type: 'academy', level: 0, hp: 0, started_at: '2020-08-19 19:06:22', finished_at: '2020-08-19 19:07:22'});
    } catch(err) {
      expect(err).toStrictEqual( Error(104) );
    }
});

test('add: invalid (missing) data returns error 100', async () => {
  try {
    const result = await building.add({kingdomId: 1, level: 0, hp: 0, started_at: '2020-08-19 19:06:22', finished_at: '2020-08-19 19:07:22'});
  } catch(err) {
    expect(err).toStrictEqual( Error(100) );
  }
});

test('add: more invalid (missing) data returns error 100', async () => {
  try {
    const result = await building.add({kingdomId: 1, level: 0, hp: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(100) );
  }
});

test('add: valid params return db query with params', async () => {
  const result = await building.add({kingdomId: 1, type: 'academy', level: 0, hp: 0, started_at: '2020-08-19 19:06:22', finished_at: '2020-08-19 19:07:22'});
  expect(result).toStrictEqual({
    query: `
            INSERT INTO buildings 
            (kingdom_id,type,level,hp,started_at,finished_at) 
            VALUES(?,?,?,?,?,?)
        `,
    params: [ 1, 'academy', 0, 0, '2020-08-19 19:06:22', '2020-08-19 19:07:22' ]
  });
});

test('getByKingdomId: missing kingdomId returns error 104', async () => {
  try {
    const result = await building.getByKingdomId({});
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('getByKingdomId: valid params return db query with params', async () => {
  const result = await building.getByKingdomId({kingdomId: 1});
  expect(result).toStrictEqual({
    query: `SELECT * FROM buildings WHERE kingdom_id = ?`,
    params: [ 1 ]
  });
});
