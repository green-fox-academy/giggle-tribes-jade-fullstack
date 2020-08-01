import { buildingService } from '../services';

const errorMessage = buildingService.errorTypes;

const errorTypes = {
    [errorMessage.missingType]: {status: 400, message: 'Type is required.'},
    [errorMessage.wrongType]: {status: 404, message: 'Wrong type.'},
    [errorMessage.notEnoughGold]: {status: 400, message: "You don't have enough money."},
    [errorMessage.invalidId]: {status: 404, message: 'Invalid kingdom id.'}
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
        return res.status( status ).json( {error: message });
    }
};

export const buildingsController = {
    post
};
