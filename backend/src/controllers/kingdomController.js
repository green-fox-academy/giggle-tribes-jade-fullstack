export class KingdomController {

    constructor({KingdomService,KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes}) {
        this.kingdom = new KingdomService({KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.errorMessages = {
            [errorCodes.missingKingdomId]: {status: 400, message: 'Missing kingdomId.'},
            [errorCodes.missingLocationCode]: {status: 400, message: 'Missing locationCode.'},
            [errorCodes.invalidKingdomId]: {status: 400, message: 'Invalid kingdomId.'},
            [errorCodes.invalidLocationCode]: {status: 400, message: 'Location code is too short.'},
            [errorCodes.usedLocationCode]: {status: 400, message: 'Location is already taken.'},
            [errorCodes.usedKingdomId]: {status: 400, message: 'Kingdom is already located.'},
        };
    };

    post(req,res) {
        const params = {
            kingdomId : req.params.kingdomId,
            locationCode : req.body.country_code
        };
        this.kingdom.attachLocation(params)
         .then( response => res.status(201).json(response) )
         .catch( error => 
            res.status( this.errorMessages[error.message].status || 400 )
            .json({ error: this.errorMessages[error.message].message || error.message }) );
    };
    
    get(req,res) {
        this.kingdom.get()
        .then( response => res.status(200).json(response) )
        .catch( error => 
            res.status( this.errorMessages[error.message].status || 400 )
            .json({ error: this.errorMessages[error.message].message || error.message }) );
    };
    
    getById(req,res) {
        const {kingdomId} = req.params;
        this.kingdom.getById({kingdomId})
        .then( response => res.status(200).json(response) )
        .catch( error => 
            res.status( this.errorMessages[error.message].status || 400 )
            .json({ error: this.errorMessages[error.message].message || error.message }) );
    };

};
