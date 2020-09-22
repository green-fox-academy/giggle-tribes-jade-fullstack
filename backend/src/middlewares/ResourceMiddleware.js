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
            [errorCodes.invalidToken]: {status: 403, message: 'Unauthorized for this kingdom.'},
        };
    };

    async post(req, res, next) {
        const { kingdomId } = req.params;
        const kingdomIdTarget = req.user.kingdomId;
        try {
            if ( kingdomId != kingdomIdTarget ) throw new Error('212');
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
