import { checkLoginDB } from './checkLoginDB';
const jwt = require('jsonwebtoken');

export const allFieldsProvided = {
  async checkLogin(username, password) {
    const result = await checkLoginDB(username, password);
    if (result > 0) {
      return {
        status: 'ok',
        token: jwt.sign({ username: username }, process.env.JWT_SECRET),
      };
    } else {
      return { error: 'Username or password is incorrect.' };
    }
  },
};
