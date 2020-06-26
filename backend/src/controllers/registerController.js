import { registerService } from '../services';

export const registerController = (req,res) => {
    registerService(req.body)
     .then( response => res.json(response) )
     .catch( error => res.json({error}) );
};