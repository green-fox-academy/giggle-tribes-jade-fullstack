export class AuthenticationMiddleware {

    constructor({SessionService,UserRepo,db,errorCodes}) {
        this.session = new SessionService({UserRepo,db,errorCodes});
        this.validate = this.validate.bind(this);
    };

    validate(req, res, next) {
        try {
            req.user = this.session.verifyToken({token: req.header('TRIBES_TOKEN')});
            next();
        } catch(error) {
            res.status(401).json({error: error.message});
        }
    };

};
