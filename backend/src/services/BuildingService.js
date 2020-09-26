import {ResourceSpender} from './ResourceSpender';

export class BuildingService extends ResourceSpender {

    constructor({ buildingRepo, resourceService, errorCodes}) {
        super({ resourceService, errorCodes });
        this.building = buildingRepo;
        this.buildingData = {};
        this.buildingStats = {
            farm : { hp : 1, time : 60000 },
            mine : { hp : 1, time : 60000 },
            academy : { hp : 1, time : 60000 }
        };
        this.resourceStats = {
            farm : { cost : 100, res: 'food', gen : 5 },
            mine : { cost : 100, res: 'gold', gen : 5 },
            academy : { cost : 100, res: '', gen : 0 }
        };
    };

    validateParams({ kingdomId, buildingType }) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!buildingType) throw new Error(this.errorCodes.missingBuildingType);
        if (!['farm','mine','academy'].includes(buildingType)) throw new Error(this.errorCodes.invalidBuildingType);
    };

    setBuildingData({ kingdomId, buildingType }) {
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

    async add({ kingdomId, buildingType} ) {
        this.validateParams({ kingdomId, buildingType });

        await this.setResources( kingdomId, buildingType );

        this.setBuildingData({ kingdomId, buildingType });
        this.buildingData.id = (await this.building.add(this.buildingData)).insertId;

        await this.spendResources();

        return this.buildingData;
    };

    async getByKingdomId({ kingdomId, buildingId }) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        let buildings = await this.building.getByKingdomId({kingdomId});
        if (buildingId) buildings = buildings.filter( e => e.id == buildingId );
        return { buildings };
    };

};
