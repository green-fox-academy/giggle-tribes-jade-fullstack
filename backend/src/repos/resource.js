import { db } from '../data/connection';

export const getResourceForKingdom = async kingdomID => {
  const resource = await db.query(
    `select * from kingdom_resource where kingdom_id = ?;`,
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
    `insert into kingdom_resource (kingdom_id, type, amount, generation, updatedAt) values(?,?,?,?,now());`,
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
    `update kingdom_resource set type=?, amount=?, generation=?, updatedAt=now() where kingdom_id=?;`,
    [type, amount, generation, kingdomID]
  );
  return resource.results;
};
