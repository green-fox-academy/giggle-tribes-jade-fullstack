export class AuthenticationMiddleware {

    constructor( sessionService, errorCodes ) {
        this.session = sessionService;
        this.validate = this.validate.bind(this);
        this.errorMessages = {
            [errorCodes.missingToken]: {status: 401, message: 'Token is required.'},
            [errorCodes.invalidToken]: {status: 401, message: 'Invalid token.'}
        };
    };

    validate(req, res, next) {
        try {
            req.user = this.session.verifyToken({token: req.header('TRIBES_TOKEN')});
            next();
        } catch(error) {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 401;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        }
    };

};
