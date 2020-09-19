export class ResourceMiddleware {

    constructor( resourceService, errorCodes ) {
        this.resources = resourceService;
        this.post = this.post.bind(this);
        this.errorMessages = {
            [errorCodes.missingKingdomId]: {status: 400, message: 'Missing kingdomId.'},
            [errorCodes.missingResourceType]: {status: 400, message: 'Missing resource type.'},
            [errorCodes.missingResourceAmount]: {status: 400, message: 'Missing resource amount.'},
            [errorCodes.missingResourceGeneration]: {status: 400, message: 'Missing resource generation.'},
            [errorCodes.invalidKingdomId]: {status: 400, message: 'Invalid kingdomId.'},
        };
    };

    async post(req, res, next) {
        const {kingdomId} = req.params;
        try {
            await this.resources.generateResources({kingdomId});
            next();
        } catch(error) {
            const status = (this.errorMessages[error.message]) ? this.errorMessages[error.message].status : 401;
            const message = (this.errorMessages[error.message]) ? this.errorMessages[error.message].message : error.message;
            res.status( status )
                .json({ error: message });
        }
    };

};
