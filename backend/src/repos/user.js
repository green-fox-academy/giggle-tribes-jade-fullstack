import { db } from '../data/connection';

export const getUser = async (username, password) => {
  const user = await db.query(
    `select * from users where name = ? AND password = ?;`,
    [username, password]
  );
  return user.results;
};

export const getKingdomIdForUser = async userID => {
  const kingdom = await db.query(
    `select * from users_kingdoms where user_id = ?;`,
    userID
  );
  return kingdom.results;
};
