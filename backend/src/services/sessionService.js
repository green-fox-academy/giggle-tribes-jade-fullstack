import { userService } from '../services/userService';
import { getToken } from './tokenService';

export const sessionService = {
  async login({ username, password }) {
    const errorMessages = {
      1: 'Password is required.',
      2: 'Username is required.',
      3: 'All fields are required.',
    };
    if (username && password) {
      try {
        const result = await userService.get({ username, password });
        console.log(result);
        return {
          status: 'ok',
          token: await getToken(result.userID, result.kingdomID),
          kingdomID: result.kingdomID,
        };
      } catch (error) {
        return error;
      }
    } else if (username && !password) {
      throw { error: errorMessages[1] };
    } else if (!username && password) {
      throw { error: errorMessages[2] };
    } else {
      throw { error: errorMessages[3] };
    }
  },
};
