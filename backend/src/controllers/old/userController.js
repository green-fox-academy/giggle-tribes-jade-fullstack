import { UserService } from '../services';
import { UserRepo, KingdomRepo, ResourceRepo, errorCodes } from '../repos';
import { db } from '../data/connection';

const user = new UserService({UserRepo,KingdomRepo,ResourceRepo,db,errorCodes});

const post = (req,res) => {
    const {username,password,kingdomname} = req.body;
    user.add({userName:username,password,kingdomName:kingdomname})
     .then( response => res.status(201).json(response) )
     .catch( error => res.status(400).json({error:error.message}) );
};

export const userController = {
    post
};
