import { ResourceService } from '../services';
import { ResourceRepo, errorCodes } from '../repos';
import { db } from '../data/connection';

const resources = new ResourceService({ResourceRepo,db,errorCodes});

const get = (req,res) => {
  const kingdomId = req.params.kingdomId;
  resources.getByKingdomId({kingdomId})
   .then( response => res.status(200).json(response) )
   .catch( error => res.status(400).json({error:error.message}) );
};

export const resourceController = {
  get
};
