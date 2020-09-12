export class ResourceMiddleware {

    constructor({ResourceService,ResourceRepo,db,errorCodes}) {
        this.resources = new ResourceService({ResourceRepo,db,errorCodes});
        this.post = this.post.bind(this);
    };

    async post(req, res, next) {
        const {kingdomId} = req.params;
        try {
            await this.resources.generateResources({kingdomId});
            next();
        } catch(error) {
            res.status(400).json({error: error.message});
        }
    };

};
