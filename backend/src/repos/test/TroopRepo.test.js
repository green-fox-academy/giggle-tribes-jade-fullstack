import { TroopRepo } from '../../repos';
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

const troop = new TroopRepo(db,errorCodes);

test('add: missing kingdomId returns error 104', async () => {
    try {
      const result = await troop.add({level: 0, hp: 0, attack: 0, defence: 0, started_at: '2020-08-19 19:06:22', finished_at: '2020-08-19 19:07:22'});
    } catch(err) {
      expect(err).toStrictEqual( Error(104) );
    }
});

test('add: invalid (missing) data returns error 100', async () => {
  try {
    const result = await troop.add({kingdomId: 1, level: 0, hp: 0, started_at: '2020-08-19 19:06:22', finished_at: '2020-08-19 19:07:22'});
  } catch(err) {
    expect(err).toStrictEqual( Error(100) );
  }
});

test('add: more invalid (missing) data returns error 100', async () => {
  try {
    const result = await troop.add({kingdomId: 1, level: 0, hp: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(100) );
  }
});

test('add: valid params return db query with params', async () => {
  const result = await troop.add({kingdomId: 1, level: 0, hp: 0, attack: 0, defence: 0, started_at: '2020-08-19 19:06:22', finished_at: '2020-08-19 19:07:22'});
  expect(result).toStrictEqual({
    query: `
<<<<<<< HEAD
            INSERT INTO troops
=======
            INSERT INTO kingdom_troops
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
            (kingdom_id,level,hp,attack,defence,started_at,finished_at) 
            VALUES(?,?,?,?,?,?,?)
        `,
    params: [ 1, 0, 0, 0, 0, '2020-08-19 19:06:22', '2020-08-19 19:07:22' ]
  });
});

test('getByKingdomId: missing kingdomId returns error 104', async () => {
  try {
    const result = await troop.getByKingdomId({});
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('getByKingdomId: valid params return db query with params', async () => {
  const result = await troop.getByKingdomId({kingdomId: 1});
  expect(result).toStrictEqual({
<<<<<<< HEAD
    query: `SELECT * FROM troops WHERE kingdom_id = ?`,
=======
    query: `SELECT * FROM kingdom_troops WHERE kingdom_id = ?`,
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
    params: [ 1 ]
  });
});

test('update: missing troopId returns error 113', async () => {
  try {
    const result = await troop.update({});
  } catch(err) {
    expect(err).toStrictEqual( Error(113) );
  }
});

test('update: valid params return db query with params', async () => {
  const result = await troop.update({troopId: 99, level: 1, hp: 1, attack: 1, defence: 1, started_at: '2020-08-19 19:06:22', finished_at: '2020-08-19 19:07:22'});
  expect(result).toStrictEqual({
    query: `
<<<<<<< HEAD
            UPDATE troops
=======
            UPDATE kingdom_troops
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
            SET level=?, hp=?, attack=?, defence=?,
            started_at=?, finished_at=?
            WHERE id=?
        `,
    params: [ 1, 1, 1, 1, '2020-08-19 19:06:22', '2020-08-19 19:07:22', 99 ]
  });
});
