import { BuildingService, ResourceService } from '../services';
import { BuildingRepo, ResourceRepo, errorCodes } from '../repos';
import { db } from '../data/connection';

const building = new BuildingService({BuildingRepo,ResourceService,ResourceRepo,db,errorCodes});

/*const {errorMessages} = buildingService;

const errorTypes = {
    [errorMessages.missingType]: {status: 400, message: 'Type is required.'},
    [errorMessages.wrongType]: {status: 404, message: 'Wrong type.'},
    [errorMessages.notEnoughGold]: {status: 400, message: "You don't have enough money."},
    [errorMessages.invalidId]: {status: 404, message: 'Invalid kingdom id.'}
};*/

const post = (req,res) => {
    const params = {
        kingdomId : req.params.kingdomId,
        buildingType : req.body.type
    };
    building.add(params)
     .then( response => res.status(201).json(response) )
     .catch( error => res.status(400).json({error:error.message}) );
};

export const buildingsController = {
    post
};
