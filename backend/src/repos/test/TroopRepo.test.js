import { TroopRepo } from '../../repos';
import { errorCodes } from '../../repos';

describe('add', () => {
  const db = {
    query: (...query) => {
      return {
        results: {
          insertId: 2,
        },
      };
    },
  };

  const troop = new TroopRepo(db, errorCodes);
  test('add: missing kingdomId returns error 104', async () => {
    try {
      await troop.add({
        level: 0,
        hp: 0,
        attack: 0,
        defence: 0,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:07:22',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(104));
    }
  });

  test('add: invalid (missing) data returns error 100', async () => {
    try {
      await troop.add({
        kingdom_id: 1,
        level: 0,
        hp: 0,
        started_at: '2020-08-19 19:06:22',
        finished_at: '2020-08-19 19:07:22',
      });
    } catch (err) {
      expect(err).toStrictEqual(Error(100));
    }
  });

  test('add: more invalid (missing) data returns error 100', async () => {
    try {
      await troop.add({ kingdom_id: 1, level: 0, hp: 0 });
    } catch (err) {
      expect(err).toStrictEqual(Error(100));
    }
  });

  test('add: valid params return db query with params', async () => {
    const result = await troop.add({
      kingdom_id: 1,
      level: 0,
      hp: 0,
      attack: 0,
      defence: 0,
      started_at: '2020-08-19 19:06:22',
      finished_at: '2020-08-19 19:07:22',
    });
    expect(result).toStrictEqual({
      insertId: 2,
    });
  });
});

describe('getByKingdom', () => {
  const db = {
    query: (...query) => {
      return {
        results: [],
      };
    },
  };
  const troop = new TroopRepo(db, errorCodes);
  test('getByKingdomId: missing kingdomId returns error 104', async () => {
    try {
      await troop.getByKingdomId({});
    } catch (err) {
      expect(err).toStrictEqual(Error(104));
    }
  });

  test('getByKingdomId: valid params return troops', async () => {
    const result = await troop.getByKingdomId({ kingdomId: 1 });
    expect(result).toStrictEqual([]);
  });
});

describe('update', () => {
  const db = {
    query: (...query) => {
      return {
        results: {
          changedRows: 2,
        },
      };
    },
  };

  const troop = new TroopRepo(db, errorCodes);
  test('update: missing troopId returns error 113', async () => {
    try {
      await troop.update({});
    } catch (err) {
      expect(err).toStrictEqual(Error(113));
    }
  });

  test('update: valid params return db query with params', async () => {
    const result = await troop.update({
      id: [99],
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: '2020-08-19 19:06:22',
      finished_at: '2020-08-19 19:07:22',
    });
    expect(result).toStrictEqual({
      changedRows: 2,
    });
  });
});
