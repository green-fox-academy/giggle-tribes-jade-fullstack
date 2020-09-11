import { KingdomService } from '../services';
import { KingdomRepo, BuildingRepo, LocationRepo, ResourceRepo, errorCodes } from '../repos';
import { db } from '../data/connection';

const kingdom = new KingdomService({KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});

const post = (req,res) => {
    const params = {
        kingdomId : req.params.kingdomId,
        locationCode : req.body.country_code
    };
    kingdom.attachLocation(params)
     .then( response => res.status(201).json(response) )
     .catch( error => res.status(400).json({error:error.message}) );
};

const get = (req,res) => {
    kingdom.get()
    .then( response => res.status(200).json(response) )
    .catch( error => res.status(400).json({error:error.message}) );
};

const getById = (req,res) => {
    const {kingdomId} = req.params;
    kingdom.getById({kingdomId})
    .then( response => res.status(200).json(response) )
    .catch( error => res.status(400).json({error:error.message}) );
};

export const kingdomController = {
    post,
    get,
    getById
};
