import { db } from '../data/connection';

export const checkUserTable = async userID => {
  const kingdom = await db.query(
    `select * from user_kingdom where user_id = ?;`,
    userID
  );
  return kingdom.results;
};
