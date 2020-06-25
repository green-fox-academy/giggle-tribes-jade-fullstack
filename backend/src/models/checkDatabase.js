import { db } from '../data/connection';

export const checkUser = async (username, password) => {
  const result = await db.query(
    `select * from user where username = ? AND password = ?;`,
    [username, password]
  );

  return result.results.length;
};
