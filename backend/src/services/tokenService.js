const jwt = require('jsonwebtoken');

export const getToken = async (userID, kingdomID) => {
  return jwt.sign(
    {
      userID: userID,
      kingdomID: kingdomID,
    },
    process.env.JWT_SECRET || 'tribes'
  );
};
