export default class QueryHandler {
    
    static errorMessages = {
        missingParam: 1,
        invalidParam: 2
    };

    constructor(db) {
        this.db = db;
    };

    validateParams = (params) => {
        Object.keys(params).forEach( param => {
            if (params[param] === "") throw new Error(QueryHandler.errorMessages.invalidParam);
        });
        return Object.values(params);
    };

    validateQuery(query,...params) {
        params.forEach( param => {
            if (!param) throw new Error(QueryHandler.errorMessages.missingParam);
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
