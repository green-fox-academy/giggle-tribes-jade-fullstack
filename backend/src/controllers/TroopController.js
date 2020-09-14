export class TroopController {

    constructor({ResourceService,TroopService,ResourceRepo,TroopRepo,db,errorCodes}) {
        this.troop = new TroopService({TroopRepo,ResourceService,ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.errorMessages = {
            [errorCodes.missingKingdomId]: {status: 400, message: 'KingdomId is missing.'},
            [errorCodes.missingResourceType]: {status: 400, message: 'Missing resource type.'},
            [errorCodes.missingResourceAmount]: {status: 400, message: 'Missing resource amount.'},
            [errorCodes.missingResourceGeneration]: {status: 400, message: 'Missing resource generation.'},
            [errorCodes.invalidKingdomId]: {status: 400, message: 'Invalid kingdomId.'},
            [errorCodes.invalidResourceAmount]: {status: 400, message: 'Not enough gold.'},
        };
    };

    post(req,res) {
        const kingdomId = req.params.kingdomId;
        this.troop.add({kingdomId})
         .then( response => res.status(201).json(response) )
         .catch( error => 
            res.status( this.errorMessages[error.message].status || 400 )
            .json({ error: this.errorMessages[error.message].message || error.message }) );
    };

    get(req,res) {
        const kingdomId = req.params.kingdomId;
        this.troop.getByKingdomId({kingdomId})
         .then( response => res.status(201).json(response) )
         .catch( error => {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 400;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        });
    };
    
};
