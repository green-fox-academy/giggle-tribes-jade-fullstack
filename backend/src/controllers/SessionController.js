export class SessionController {

<<<<<<< HEAD
    constructor({SessionService,UserRepo,db,errorCodes}) {
        this.session = new SessionService({UserRepo,db,errorCodes});
=======
    constructor( sessionService, errorCodes ) {
        this.session = sessionService;
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
        this.post = this.post.bind(this);
        this.errorMessages = {
            [errorCodes.missingUserNameAndPassword]: {status: 401, message: 'Username and password are required.'},
            [errorCodes.missingUserName]: {status: 401, message: 'Username is reuired.'},
            [errorCodes.missingPassword]: {status: 401, message: "Password is required."},
            [errorCodes.invalidUserNameAndPassword]: {status: 401, message: 'Invalid username or password.'},
        };
    };

    post(req,res) {
        const {username,password} = req.body;
        this.session.login({userName:username,password})
        .then( response => res.status(200).json(response) )
        .catch( error => {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 401;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        });
    };

};
