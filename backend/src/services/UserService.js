export class UserService {
  constructor({
    userRepo,
    kingdomRepo,
    resourceService,
    buildingService,
    errorCodes,
  }) {
    this.user = userRepo;
    this.kingdom = kingdomRepo;
    this.resource = resourceService;
    this.building = buildingService;
    this.errorCodes = errorCodes;
  }

  validateParams({ userName, password, kingdomName }) {
    if (!userName && !password)
      throw new Error(this.errorCodes.missingUserNameAndPassword);
    if (!userName) throw new Error(this.errorCodes.missingUserName);
    if (!password) throw new Error(this.errorCodes.missingPassword);
    if (password.length < 8) throw new Error(this.errorCodes.invalidPassword);
    if (!kingdomName) throw new Error(this.errorCodes.missingKingdomName);
  }

  async add({ userName, password, kingdomName }) {
    this.validateParams({ userName, password, kingdomName });
    const userId = (await this.user.add({ userName, password })).insertId;
    const kingdomId = (await this.kingdom.add({ kingdomName })).insertId;
    await this.kingdom.attachUser({ kingdomId, userId });
    await this.resource.add({ kingdomId });
    await this.building.add({ kingdomId, buildingType: 'townhall' });
    return {
      id: userId,
      username: userName,
      kingdomId: kingdomId,
    };
  }
}
