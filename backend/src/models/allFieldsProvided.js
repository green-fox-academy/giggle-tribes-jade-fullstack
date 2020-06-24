import { checkDatabase } from './checkDatabase';
const jwt = require('jsonwebtoken');

export const allFieldsProvided = {
  async checkLogin(username, password) {
    checkDatabase
      .checkLogin(username, password, result => {
        if (result.success) {
          console.log(result);
          return {
            status: 'ok',
            token: jwt.sign({ username: username }, process.env.JWT_SECRET),
          };
        } else {
          console.log(result);
          return { error: 'Username or password is incorrect.' };
        }
      })
      .then(response => console.log('Then' + response));
  },
};
