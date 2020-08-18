import { db } from '../data/connection';

export const getResourceForKingdom = async kingdomID => {
  const resource = await db.query(
    `select * from kingdoms_resources where kingdom_id = ?;`,
    kingdomID
  );
  return resource.results;
};

export const insertResourceForKingdom = async (
  kingdomID,
  type,
  amount,
  generation
) => {
  const resource = await db.query(
    `insert into kingdoms_resources (kingdom_id, type, amount, generation, updatedAt) values(?,?,?,?,now());`,
    [kingdomID, type, amount, generation]
  );
  return resource.results;
};

export const updateResourceForKingdom = async (
  kingdomID,
  type,
  amount,
  generation
) => {
  const resource = await db.query(
    `update kingdoms_resources set amount=?, generation=?, updatedAt=now() where kingdom_id=? AND type=?;`,
    [amount, generation, kingdomID, type]
  );
  return resource.results;
};

