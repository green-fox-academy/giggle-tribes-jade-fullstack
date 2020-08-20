import mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool({
  connectionLimit: 2,
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

export const db = {
  query(query, values) {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, results, fields) => {
        if (err) {
          reject(err);

          return;
        }
        resolve({ results, fields});
      });
    });
  },
};
