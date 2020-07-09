const jwt = require('jsonwebtoken');

export const authService = (token, secret) => {
    return new Promise( (resolve,reject) => {
        if (!token) {
            reject({error: 'No token provided.'});
        } else {
            try {
                const verifiedToken = jwt.verify(token, process.env.JWT_SECRET || secret);
                resolve({
                    "userId": verifiedToken.userId,
                    "kingdomId": verifiedToken.kingdomId
                });
            } catch {
                reject({error: 'Invalid token.'});
            }  
        }
    });
};
