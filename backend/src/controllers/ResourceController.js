export class ResourceController {

    constructor({ResourceService,ResourceRepo,db,errorCodes}) {
        this.resources = new ResourceService({ResourceRepo,db,errorCodes});
        this.get = this.get.bind(this);
        this.errorMessages = {
            [errorCodes.missingKingdomId]: {status: 400, message: 'KingdomId is missing.'},
            [errorCodes.missingResourceType]: {status: 400, message: 'Missing resource type.'},
            [errorCodes.missingResourceAmount]: {status: 400, message: 'Missing resource amount.'},
            [errorCodes.missingResourceGeneration]: {status: 400, message: 'Missing resource generation.'},
            [errorCodes.invalidKingdomId]: {status: 400, message: 'Invalid kingdomId.'},
            [errorCodes.usedKingdomId]: {status: 400, message: 'Resources already set to this kingdom.'},
        };
    };

    get(req,res) {
        const kingdomId = req.params.kingdomId;
        this.resources.getByKingdomId({kingdomId})
         .then( response => res.status(200).json(response) )
         .catch( error => {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 400;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        });
    };

};
