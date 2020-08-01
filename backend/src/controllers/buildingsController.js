import { buildingService } from '../services';

const {errorMessages} = buildingService;

const errorTypes = {
    [errorMessages.missingType]: {status: 400, message: 'Type is required.'},
    [errorMessages.wrongType]: {status: 404, message: 'Wrong type.'},
    [errorMessages.notEnoughGold]: {status: 400, message: "You don't have enough money."},
    [errorMessages.invalidId]: {status: 404, message: 'Invalid kingdom id.'}
};

const post = async (req,res) => {
    const data = {
        kingdomId : req.params.kingdomId,
        type : req.body.type
    };
    try {
        const response = await buildingService.add(data);
        return res.status(201).json( response );
    } catch(error) {
        if(!errorTypes[error.message]) return res.status(400).json( {error: error.message });
        const {status,message} = errorTypes[error.message];
        return res.status( status ).json( { error: message });
    }
};

export const buildingsController = {
    post
};
