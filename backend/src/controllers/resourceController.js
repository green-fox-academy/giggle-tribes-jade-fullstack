export class ResourceController {

    constructor({ResourceService,ResourceRepo,db,errorCodes}) {
        this.resources = new ResourceService({ResourceRepo,db,errorCodes});
        this.get = this.get.bind(this);
    };

    get(req,res) {
        const kingdomId = req.params.kingdomId;
        this.resources.getByKingdomId({kingdomId})
         .then( response => res.status(200).json(response) )
         .catch( error => res.status(400).json({error:error.message}) );
    };

};
