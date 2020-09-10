export class SessionController {

    constructor({SessionService,UserRepo,db,errorCodes}) {
        this.session = new SessionService({UserRepo,db,errorCodes});
        this.post = this.post.bind(this);
    };

    post(req,res) {
        const {username,password} = req.body;
        this.session.login({userName:username,password})
        .then( response => res.status(200).json(response) )
        .catch( error => res.status(401).json({error:error.message}) );
    };

};
