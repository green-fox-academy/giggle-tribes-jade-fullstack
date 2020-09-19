import {ResourceSpender} from './ResourceSpender';

export class BuildingService extends ResourceSpender {

<<<<<<< HEAD
    constructor({BuildingRepo,ResourceService,ResourceRepo,db,errorCodes}) {
        super({ResourceService,ResourceRepo,db,errorCodes});
        this.building = new BuildingRepo(db,errorCodes);
=======
    constructor({ buildingRepo, resourceService, errorCodes}) {
        super({ resourceService, errorCodes });
        this.building = buildingRepo;
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
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

<<<<<<< HEAD
    validateParams({kingdomId,buildingType}) {
=======
    validateParams({ kingdomId, buildingType }) {
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!buildingType) throw new Error(this.errorCodes.missingBuildingType);
        if (!['farm','mine','academy'].includes(buildingType)) throw new Error(this.errorCodes.invalidBuildingType);
    };

<<<<<<< HEAD
    setBuildingData({kingdomId,buildingType}) {
=======
    setBuildingData({ kingdomId, buildingType }) {
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
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

<<<<<<< HEAD
    async add({kingdomId,buildingType}) {
        this.validateParams({kingdomId,buildingType});

        await this.setResources(kingdomId,buildingType);

        this.setBuildingData({kingdomId,buildingType});
=======
    async add({ kingdomId, buildingType} ) {
        this.validateParams({ kingdomId, buildingType });

        await this.setResources( kingdomId, buildingType );

        this.setBuildingData({ kingdomId, buildingType });
>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
        this.buildingData.id = (await this.building.add(this.buildingData)).insertId;

        await this.spendResources();

        return this.buildingData;
    };

<<<<<<< HEAD
=======
    async getByKingdomId({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const buildings = await this.building.getByKingdomId({kingdomId});
        return { buildings };
    };

>>>>>>> 62cb0ede2476cea6fb24284453fc5293d0cccd5e
};
