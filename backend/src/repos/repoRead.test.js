import { repo } from '../repos/repoHandler';
jest.mock('../data/connection');
import {db} from '../data/connection';


test('kingdomBaseData with empty kingdom_id throws error', async () => {
  try {
    await repo.read('kingdomBaseData', {'kingdom_id' : ''});
  } catch(err) {
    expect(err.validationError).toBe(`The kingdom_id was not provided.`);
  }
});

test('kingdomBaseData with kingdom_id returns an array', async () => {
  db.query.mockImplementation( () => {
    return {
      results : {
        userid : 4,
        kingdomname : 'kingdomname'
      }
    }
  });
  const result = await repo.read('kingdomBaseData', {
    userid : 4,
    kingdomname : 'kingdomname'
  });
  expect(result.userid).toBe(4);
});

