export class TroopController {

    constructor({ResourceService,TroopService,ResourceRepo,TroopRepo,db,errorCodes}) {
        this.troop = new TroopService({TroopRepo,ResourceService,ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
    };

    post(req,res) {
        const kingdomId = req.params.kingdomId;
        this.troop.add({kingdomId})
         .then( response => res.status(201).json(response) )
         .catch( error => res.status(400).json({error:error.message}) );
    };

    get(req,res) {
        const kingdomId = req.params.kingdomId;
        this.troop.getByKingdomId({kingdomId})
         .then( response => res.status(201).json(response) )
         .catch( error => res.status(400).json({error:error.message}) );
    };
    
};
