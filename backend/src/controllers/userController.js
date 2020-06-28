import { userService } from '../services';

export const userController = (req,res) => {
    userService(req.body)
     .then( response => res.json(response) )
     .catch( error => res.json({error}) );
};
