export class UserController {

    constructor({UserService,UserRepo,KingdomRepo,ResourceRepo,db,errorCodes}) {
        this.user = new UserService({UserRepo,KingdomRepo,ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
        this.errorCodes = errorCodes;
        this.errorMessages = {
            [errorCodes.missingUserNameAndPassword]: {status: 400, message: 'Username and password are required.'},
            [errorCodes.missingUserName]: {status: 400, message: 'Username is reuired.'},
            [errorCodes.missingPassword]: {status: 400, message: "Password is required."},
            [errorCodes.missingUserId]: {status: 400, message: 'Missing userId.'},
            [errorCodes.missingKingdomName]: {status: 400, message: 'Kingdom name is required.'},
            [errorCodes.invalidPassword]: {status: 400, message: 'Password is too short.'},
            [errorCodes.invalidUserId]: {status: 400, message: 'Invalid userId.'},
            [errorCodes.invalidUserNameAndPassword]: {status: 400, message: 'Invalid username or password.'},
            [errorCodes.invalidUserName]: {status: 400, message: 'Invalid username.'},
            [errorCodes.usedUserName]: {status: 400, message: 'Username is already taken.'},
        };
    };

    post(req,res) {
        const {username,password,kingdomname} = req.body;
        this.user.add({userName:username,password,kingdomName:kingdomname})
        .then( response => res.status(201).json(response) )
        .catch( error => {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 400;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        });
    };

};
