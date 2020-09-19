export class BuildingController {

<<<<<<< HEAD
    constructor({ResourceService,BuildingService,ResourceRepo,BuildingRepo,db,errorCodes}) {
        this.building = new BuildingService({BuildingRepo,ResourceService,ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
=======
    constructor( buildingService, errorCodes ) {
        this.building = buildingService;
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
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
         .catch( error => {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 400;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        });
    };
<<<<<<< HEAD
=======

    get(req,res) {
        const kingdomId = req.params.kingdomId;
        this.building.getByKingdomId({kingdomId})
         .then( response => res.status(201).json(response) )
         .catch( error => {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 400;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        });
    };
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
    
};
