import { db } from '../data/connection';

export const checkUserTable = async (username, password) => {
  const user = await db.query(
    `select * from user where username = ? AND password = ?;`,
    [username, password]
  );
  return user.results;
};
