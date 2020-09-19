import { ResourceRepo } from '../../repos';
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

const resource = new ResourceRepo(db,errorCodes);

test('add: missing kingdomId returns error 104', async () => {
    try {
      const result = await resource.add({type: 'gold', amount: 0, generation: 0});
    } catch(err) {
      expect(err).toStrictEqual( Error(104) );
    }
});

test('add: missing type returns error 106', async () => {
  try {
    const result = await resource.add({kingdomId: 1, amount: 0, generation: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(106) );
  }
});

test('add: missing amount returns error 107', async () => {
  try {
    const result = await resource.add({kingdomId: 1, type: 'gold', generation: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(107) );
  }
});

test('add: missing generation returns error 108', async () => {
  try {
    const result = await resource.add({kingdomId: 1, type: 'gold', amount: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(108) );
  }
});

test('add: valid params return db query with params', async () => {
  const result = await resource.add({kingdomId: 1, type: 'gold', amount: 0, generation: 0});
  expect(result).toStrictEqual({
    query: `
            INSERT INTO kingdoms_resources 
            (kingdom_id, type, amount, generation, updatedAt) 
            VALUES(?,?,?,?,now())
        `,
    params: [ 1, 'gold', 0, 0 ]
  });
});

test('update: missing kingdomId returns error 104', async () => {
  try {
    const result = await resource.update({type: 'gold', amount: 0, generation: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('update: missing type returns error 106', async () => {
  try {
    const result = await resource.update({kingdomId: 1, amount: 0, generation: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(106) );
  }
});

test('update: missing amount returns error 107', async () => {
  try {
    const result = await resource.update({kingdomId: 1, type: 'gold', generation: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(107) );
  }
});

test('update: missing generation returns error 108', async () => {
  try {
    const result = await resource.update({kingdomId: 1, type: 'gold', amount: 0});
  } catch(err) {
    expect(err).toStrictEqual( Error(108) );
  }
});

test('update: valid params return db query with params', async () => {
  const result = await resource.update({kingdomId: 1, type: 'gold', amount: 0, generation: 0});
  expect(result).toStrictEqual({
    query: `
            UPDATE kingdoms_resources
            SET amount=?, generation=?, updatedAt=now()
            WHERE kingdom_id=? AND type =?
        `,
    params: [ 0, 0, 1, 'gold' ]
  });
});

test('get: missing kingdomId returns error 104', async () => {
  try {
    const result = await resource.getByKingdomId({});
  } catch(err) {
    expect(err).toStrictEqual( Error(104) );
  }
});

test('get: valid kingdomId return db query with params', async () => {
  const result = await resource.getByKingdomId({kingdomId: 1});
  expect(result).toStrictEqual({
    query: `SELECT * FROM kingdoms_resources WHERE kingdom_id = ?`,
    params: [ 1 ]
  });
});

