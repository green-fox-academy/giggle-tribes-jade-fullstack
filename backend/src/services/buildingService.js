export class BuildingService {

    constructor({BuildingRepo,ResourceService,ResourceRepo,db,errorCodes}) {
        this.building = new BuildingRepo(db,errorCodes);
        this.resources = new ResourceService({ResourceRepo,db,errorCodes});
        this.errorCodes = errorCodes;
        this.buildingData = {};
        this.buildingStats = {
            farm : { hp : 1, cost : 100, time : 60000, gen : 5 },
            mine : { hp : 1, cost : 100, time : 60000, gen : 5 },
            academy : { hp : 1, cost : 100, time : 60000, gen : 0 }
        };
    };

    validateParams({kingdomId,buildingType}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!buildingType) throw new Error(this.errorCodes.missingBuildingType);
        if (!['farm','mine','academy'].includes(buildingType)) throw new Error(this.errorCodes.invalidBuildingType);
    };

    setBuildingData({kingdomId,buildingType}) {
        const start = new Date();
        const finish = new Date( start.getTime() + this.buildingStats[buildingType].time );
        this.buildingData = {
            id : null,
            kingdomId : kingdomId,
            type : buildingType,
            level : 1,
            hp : this.buildingStats[buildingType].hp,
            started_at : start.toLocaleString(),
            finished_at : finish.toLocaleString()
        };
    };

    async add({kingdomId,buildingType}) {
        this.validateParams({kingdomId,buildingType});
        const resources = await this.resources.getByKingdomId({kingdomId});
        const gold = resources.filter(e => e.type === 'gold')[0].amount;
        const {cost,gen} = this.buildingStats[buildingType]; 
        if ( gold < cost ) throw new Error(this.errorCodes.invalidResourceAmount);

        this.setBuildingData({kingdomId,buildingType});
        this.buildingData.id = (await this.building.add(this.buildingData)).insertId;

        await this.resources.spendGold({kingdomId,amount:cost});
        if (buildingType === 'mine') await this.resources.updateGoldGeneration({kingdomId,generation:gen});
        if (buildingType === 'farm') await this.resources.updateFoodGeneration({kingdomId,generation:gen});

        return this.buildingData;
    };

};
