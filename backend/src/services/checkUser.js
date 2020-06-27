import { checkUserTable } from '../models/checkUserTable';
import { checkUserKingdomTable } from '../models/checkUserKingdomTable';
const jwt = require('jsonwebtoken');

export const checkUser = async (username, password) => {
  const user = await checkUserTable(username, password);

  if (user.results.length > 0) {
    const kingdom = await checkUserKingdomTable(user.results[0].id);
    if (kingdom.results.length > 0) {
      return {
        status: 'ok',
        token: jwt.sign(
          {
            userID: user.results[0].id,
            kingdomID: kingdom.results[0].kingdom_id,
          },
          process.env.JWT_SECRET
        ),
      };
    }
  } else {
    return { error: 'Username or password is incorrect.' };
  }
};
