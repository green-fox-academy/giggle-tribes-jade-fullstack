import { db } from '../data/connection';

export const checkLoginDB = async (username, password) => {
  const result = await db.query(
    `select * from users where user_name = ?;`, //`select * from user where username = ? AND password = ?;`
    [username, password]
  );

  return result.results.length;
};
