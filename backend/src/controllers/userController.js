import { user } from '../services';

export const add = (req,res) => {
    user.add(req.body)
     .then( response => res.status(201).json(response) )
     .catch( error => res.status(400).json({error}) );
};

export const userController = {
    add
};
