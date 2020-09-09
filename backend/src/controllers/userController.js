export class UserController {

    constructor({UserService,UserRepo,KingdomRepo,ResourceRepo,db,errorCodes}) {
        this.user = new UserService({UserRepo,KingdomRepo,ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
    };

    post(req,res) {
        const {username,password,kingdomname} = req.body;
        this.user.add({userName:username,password,kingdomName:kingdomname})
        .then( response => res.status(201).json(response) )
        .catch( error => res.status(400).json({error:error.message}) );
    };

};
