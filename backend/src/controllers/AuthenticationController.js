export class AuthenticationController {

    constructor() {
    };

    post(req,res) {
        res.json(req.user);
    };
    
};
