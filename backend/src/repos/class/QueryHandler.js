export default class QueryHandler {
    
    constructor(db) {
        this.db = db;
    };

    validateParams = (params) => {
        Object.keys(params).forEach( param => {
            if (params[param] === "") throw new Error(`Parameter '${param}' is invalid.`);
        });
        return Object.values(params);
    };

    validateQuery(query,...params) {
        params.forEach( param => {
            if (!param) throw new Error(`Parameter is missing.`);
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
