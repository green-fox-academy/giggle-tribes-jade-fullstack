export default class QueryHandler {
    
    constructor(db,errorCodes) {
        this.db = db;
        this.errorCodes = errorCodes;
    };

    validateParams = (params) => {
        Object.keys(params).forEach( param => {
            if (params[param] === "") throw new Error(this.errorCodes.invalidParam);
        });
        return Object.values(params);
    };

    validateQuery(query,...params) {
        params.forEach( param => {
            if (param === undefined) throw new Error(this.errorCodes.missingParam);
        });
        return [
            query.join('?'),
            params
        ];
    };

    async sendQuery(query) {
        return (await this.db.query(...query)).results;
    };

};
