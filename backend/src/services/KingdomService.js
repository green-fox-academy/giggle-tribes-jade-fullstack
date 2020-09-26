export class KingdomService {
  constructor({
    kingdomRepo,
    resourceService,
    buildingService,
    troopService,
    locationRepo,
    errorCodes,
  }) {
    this.kingdom = kingdomRepo;
    this.resources = resourceService;
    this.buildings = buildingService;
    this.troops = troopService;
    this.location = locationRepo;
    this.errorCodes = errorCodes;
  }

  validateParams({ kingdomId, locationCode }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
    if (!locationCode) throw new Error(this.errorCodes.missingLocationCode);
  }

  async attachLocation({ kingdomId, locationCode }) {
    this.validateParams({ kingdomId, locationCode });

    if (
      (await this.kingdom.get()).find(
        kingdom => kingdom.location === locationCode
      )
    )
      throw new Error(this.errorCodes.usedLocationCode);

    let kingdomData = await this.getById({ kingdomId });
    if (kingdomData.location.country_code !== null)
      throw new Error(this.errorCodes.usedKingdomId);
    kingdomData.location.country_code = locationCode;

    await this.location.add({ kingdomId, locationCode });

    return kingdomData;
  }

  async getById({ kingdomId }) {
    if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
    const kingdom = (await this.kingdom.getById({ kingdomId }))[0];
    const buildings = (await this.buildings.getByKingdomId({ kingdomId }))
      .buildings;
    const resources = (await this.resources.getByKingdomId({ kingdomId }))
      .resources;
    const troops = (await this.troops.getByKingdomId({ kingdomId })).troops;
    let kingdomData = {
      kingdomId: 0,
      kingdomName: '',
      userId: 0,
      location: { country_code: null },
    };

    kingdomData.kingdomId = kingdom.kingdomId;
    kingdomData.kingdomName = kingdom.kingdomName;
    kingdomData.userId = kingdom.userId;
    kingdomData.buildings = buildings;
    kingdomData.resources = resources;
    kingdomData.troops = troops;
    kingdomData.location.country_code = kingdom.location;
    return kingdomData;
  }

  async get() {
    return { kingdoms: await this.kingdom.get() };
  }
}
