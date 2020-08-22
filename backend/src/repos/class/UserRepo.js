import QueryHandler from './QueryHandler';

export class UserRepo extends QueryHandler {

    static errorMessages = {
        missingName: 1,
        invalidName: 2,
        missingPassword: 3,
        invalidPassword: 4
    };

    constructor(db) {
        super(db);
    };

    validateParams = ({name,password}) => {
        if (!name) throw new Error(UserRepo.errorMessages.missingName);
        if (name == '') throw new Error(UserRepo.errorMessages.invalidName);
        if (!password) throw new Error(UserRepo.errorMessages.missingPassword);
        if (password.length < 8) throw new Error(UserRepo.errorMessages.invalidPassword);
    };

    async add({name,password}) {
        this.validateParams({name,password});
        const query = this.validateQuery`INSERT INTO users (name,password) VALUES(${name},${password})`;
        try {
            return await (this.sendQuery(query));
        } catch(error) {
            if (error.code === 'ER_DUP_ENTRY') throw new Error(UserRepo.errorMessages.invalidName);
            throw error;
        }
    };

    async getByName({name}) {
        if (!name) throw new Error(UserRepo.errorMessages.missingName);
        const query = this.validateQuery`SELECT * FROM users WHERE name=${name}`;
        return await (this.sendQuery(query));
    };

};
