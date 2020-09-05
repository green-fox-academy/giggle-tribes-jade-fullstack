export class UserService {

    constructor({UserRepo,KingdomRepo,ResourceRepo,db,errorCodes}) {
        this.user = new UserRepo(db,errorCodes);
        this.kingdom = new KingdomRepo(db,errorCodes);
        this.resource = new ResourceRepo(db,errorCodes);
        this.errorCodes = errorCodes;
    };

    validateParams({userName,password,kingdomName}) {
        if (!userName && !password) throw new Error(this.errorCodes.missingUserNameAndPassword);
        if (!userName) throw new Error(this.errorCodes.missingUserName);
        if (!password) throw new Error(this.errorCodes.missingPassword);
        if (password.length < 8) throw new Error(this.errorCodes.invalidPassword);
        if (!kingdomName) throw new Error(this.errorCodes.missingKingdomName);
    };

    async add({userName,password,kingdomName}) {
        this.validateParams({userName,password,kingdomName});
        const userId = (await this.user.add({userName,password})).insertId;
        const kingdomId = (await this.kingdom.add({kingdomName})).insertId;
        await this.kingdom.attachUser({kingdomId, userId});
        await this.resource.add({kingdomId,type:'gold',amount:500,generation:0});
        await this.resource.add({kingdomId,type:'food',amount:500,generation:0});
        return {
            'id' : userId,
            'username' : userName,
            'kingdomId' : kingdomId
        };
    };

};
