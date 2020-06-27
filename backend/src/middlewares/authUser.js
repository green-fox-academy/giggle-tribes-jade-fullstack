const jwt = require('jsonwebtoken');

export const authUser = (req, res, next) => {
    const token = req.header('TRIBES_TOKEN');
    let response = {};
    if (!token) {
        response = {error: 'No token provided.'};
    } else {
        try {
            const signedTtoken = jwt.verify(token, process.env.JWT_SECRET);
            response = {
                "userId": token.userid,
                "kingdomId": token.kingdomid
            };
        } catch {
            response = {error: 'Invalid token.'};
        }  
    }
    req.user = response;
    next();
};
