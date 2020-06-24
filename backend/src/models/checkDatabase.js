import { db } from '../data/connection';

export const checkDatabase = {
  async checkLogin(username, password, callback) {
    let result = db.query(
      `select * from users where user_name = ? AND password = ?;`,
      [username, password]
    );

    result
      .then(response => {
        return response.results;
      })
      .then(response => {
        console.log(response);
        if (response) {
          callback({ success: true });
        } else {
          callback({ success: false });
        }
      })
      .catch(error => console.log(error.code));
  },
};
