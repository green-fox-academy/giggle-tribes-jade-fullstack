export class BuildingController {

    constructor({ResourceService,BuildingService,ResourceRepo,BuildingRepo,db,errorCodes}) {
        this.building = new BuildingService({BuildingRepo,ResourceService,ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
    };

    post(req,res) {
        const params = {
            kingdomId : req.params.kingdomId,
            buildingType : req.body.type
        };
        this.building.add(params)
         .then( response => res.status(201).json(response) )
         .catch( error => res.status(400).json({error:error.message}) );
    };
    
};
