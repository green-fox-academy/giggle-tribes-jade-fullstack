import QueryHandler from './QueryHandler';

export class UserRepo extends QueryHandler {

    constructor(db) {
        super(db);
    };

    async add({name,password}) {
        this.validateParams({name,password});
        const query = this.validateQuery`INSERT INTO users (name,password) VALUES(${name},${password})`;
        return await (this.sendQuery(query));
    };

};
