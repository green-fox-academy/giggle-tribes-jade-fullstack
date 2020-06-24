import { allFieldsProvided } from '../models/allFieldsProvided';
import { passwordRequired } from '../models/passwordRequired';
import { usernameRequired } from '../models/usernameRequired';
import { allFieldsRequired } from '../models/allFieldsRequired';

export const loginService = {
  async postLogin(username, password) {
    if (username && password) {
      return allFieldsProvided.checkLogin(username, password);
    } else if (username && !password) {
      return passwordRequired;
    } else if (!username && password) {
      return usernameRequired;
    } else {
      return allFieldsRequired;
    }
  },
};
