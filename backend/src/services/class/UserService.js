export class UserService {

    static errorMessages = {
        missingUserNameAndPassword: 1,
        missingUserName: 2,
        invalidUserName: 3,
        missingPassword: 4,
        invalidPassword: 5,
        missingKingdomName: 6
    };

    constructor(UserRepo,KingdomRepo,ResourceRepo,db) {
        this.user = new UserRepo(db);
        this.kingdom = new KingdomRepo(db);
        this.resource = new ResourceRepo(db);
    };

    validateParams = ({userName,password,kingdomName}) => {
        if (!userName && !password) throw new Error(UserService.errorMessages.missingUserNameAndPassword);
        if (!userName) throw new Error(UserService.errorMessages.missingUserName);
        if (!password) throw new Error(UserService.errorMessages.missingPassword);
        if (password.length < 8) throw new Error(UserService.errorMessages.invalidPassword);
        if (!kingdomName) throw new Error(UserService.errorMessages.missingKingdomName);
    };

    async add({userName,password,kingdomName}) {
        this.validateParams({userName,password,kingdomName});
        try {
            const userId = await this.user.add({name:username,password}).insertId;
            const kingdomId = await this.kingdom.add({kingdomName}).insertId;
            await this.kingdom.attachUser({kingdomId, userId});
            await this.resource.add({kingdomId,type:'gold',amount:500,generation:0});
            await this.resource.add({kingdomId,type:'food',amount:500,generation:0});
        } catch(error) {
            if (error.message === UserRepo.errorMessages.invalidName) throw new Error(UserService.errorMessages.invalidUserName);
            throw error;
        }
    };

};
