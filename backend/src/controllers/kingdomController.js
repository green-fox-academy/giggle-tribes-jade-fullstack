export class KingdomController {

    constructor({KingdomService,KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes}) {
        this.kingdom = new KingdomService({KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
    };

    post(req,res) {
        const params = {
            kingdomId : req.params.kingdomId,
            locationCode : req.body.country_code
        };
        this.kingdom.attachLocation(params)
         .then( response => res.status(201).json(response) )
         .catch( error => res.status(400).json({error:error.message}) );
    };
    
    get(req,res) {
        this.kingdom.get()
        .then( response => res.status(200).json(response) )
        .catch( error => res.status(400).json({error:error.message}) );
    };
    
    getById(req,res) {
        const {kingdomId} = req.params;
        this.kingdom.getById({kingdomId})
        .then( response => res.status(200).json(response) )
        .catch( error => res.status(400).json({error:error.message}) );
    };

};
