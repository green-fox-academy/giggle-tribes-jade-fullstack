const jwt = require('jsonwebtoken');

export const authService = token => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({ error: 'No token provided.' });
    } else {
      try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        resolve({
          userId: verifiedToken.userID,
          kingdomId: verifiedToken.kingdomID,
        });
      } catch (error) {
        reject({ error: 'Invalid token.' });
      }
    }
  });
};
