export class AuthenticationController {

    constructor() {
    };

    post(req,res) {
        console.log("controller::: ",req.user)
        res.json(req.user);
    };
    
};
