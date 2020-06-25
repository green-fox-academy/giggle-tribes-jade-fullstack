import { checkUser } from './checkDatabase';
const jwt = require('jsonwebtoken');

export const allFieldsProvided = {
  async checkLogin(username, password) {
    const result = await checkUser(username, password);

    if (result > 0) {
      console.log(result);
      return {
        status: 'ok',
        token: jwt.sign({ username: username }, process.env.JWT_SECRET),
      };
    } else {
      console.log(result);
      return { error: 'Username or password is incorrect.' };
    }
  },
};
