import { registerService } from '../services';

export const registerController = (req,res) => {
    registerService(req.body)
     .then( response => res.send(response) )
     .catch( error => res.send({error}) );
};