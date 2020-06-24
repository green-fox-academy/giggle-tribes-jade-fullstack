import config from '../config';
import mysql from 'mysql';

var pool = mysql.createPool({
  connectionLimit: 2,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

export const db = {
  query(query, values) {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, results, fields) => {
        console.log(config);
        if (err) {
          reject(err);

          return;
        }

        resolve({ results, fields });
      });
    });
  },
};
