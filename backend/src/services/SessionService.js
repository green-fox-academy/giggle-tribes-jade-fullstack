import jwt from 'jsonwebtoken';

export class SessionService {

<<<<<<< HEAD
    constructor({UserRepo,db,errorCodes}) {
        this.user = new UserRepo(db,errorCodes);
=======
    constructor({ userRepo, errorCodes }) {
        this.user = userRepo;
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
        this.errorCodes = errorCodes;
    };

    validateParams({userName,password}) {
        if (!userName && !password) throw new Error(this.errorCodes.missingUserNameAndPassword);
        if (!userName) throw new Error(this.errorCodes.missingUserName);
        if (!password) throw new Error(this.errorCodes.missingPassword);
    };

    getToken({userId, kingdomId}) {
        return jwt.sign({userId, kingdomId}, process.env.JWT_SECRET || 'tribes' );
    };
    
    async login({userName,password}) {
        this.validateParams({userName,password});
        const {userId, kingdomId} = ( await this.user.getAuthentication({userName,password}) )[0];
        return this.getToken({userId, kingdomId});
    };

    verifyToken({token}) {
        if (!token) throw new Error(this.errorCodes.missingToken);
        try {
            const {userId, kingdomId} = jwt.verify(token, process.env.JWT_SECRET || 'tribes' );
            return {userId, kingdomId};
        } catch (error) {
            throw new Error(this.errorCodes.invalidToken);
        }
    };

};
