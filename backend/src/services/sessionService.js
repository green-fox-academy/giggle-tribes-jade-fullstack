import { getUser, getKingdomIdForUser } from '../repos/user';
import { getToken } from '../repos/token';

export const sessionService = {
  async login(input) {
    const username = input.username;
    const password = input.password;
    const errorMessages = {
      1: 'Password is required.',
      2: 'Username is required.',
      3: 'All fields are required.',
    };
    if (username && password) {
      return checkUser(username, password);
    } else if (username && !password) {
      throw { error: errorMessages[1] };
    } else if (!username && password) {
      throw { error: errorMessages[2] };
    } else {
      throw { error: errorMessages[3] };
    }
  },
};

const checkUser = async (username, password) => {
  const user = await getUser(username, password);

  if (user.length > 0) {
    const kingdom = await getKingdomIdForUser(user[0].id);
    if (kingdom.length > 0) {
      return {
        status: 'ok',
        token: await getToken(user[0].id, kingdom[0].kingdom_id),
      };
    }
  } else {
    throw { error: 'Username or password is incorrect.' };
  }
};
