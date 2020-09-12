export class BuildingController {

    constructor({ResourceService,BuildingService,ResourceRepo,BuildingRepo,db,errorCodes}) {
        this.building = new BuildingService({BuildingRepo,ResourceService,ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
        this.errorMessages = {
            [errorCodes.missingKingdomId]: {status: 400, message: 'KingdomId is missing.'},
            [errorCodes.missingBuildingType]: {status: 400, message: 'Building type is required.'},
            [errorCodes.missingResourceType]: {status: 400, message: 'Missing resource type.'},
            [errorCodes.missingResourceAmount]: {status: 400, message: 'Missing resource amount.'},
            [errorCodes.missingResourceGeneration]: {status: 400, message: 'Missing resource generation.'},
            [errorCodes.invalidKingdomId]: {status: 400, message: 'Invalid kingdomId.'},
            [errorCodes.invalidBuildingType]: {status: 400, message: 'Wrong building type.'},
            [errorCodes.invalidResourceAmount]: {status: 400, message: 'Not enough gold.'},
        };
    };

    post(req,res) {
        const params = {
            kingdomId : req.params.kingdomId,
            buildingType : req.body.type
        };
        this.building.add(params)
         .then( response => res.status(201).json(response) )
         .catch( error => 
            res.status( this.errorMessages[error.message].status || 400 )
            .json({ error: this.errorMessages[error.message].message || error.message }) );
    };
    
};
