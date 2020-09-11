export class KingdomService {

    constructor({KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes}) {
        this.kingdom = new KingdomRepo(db,errorCodes);
        this.resources = new ResourceRepo(db,errorCodes);
        this.buildings = new BuildingRepo(db,errorCodes);
        this.location = new LocationRepo(db,errorCodes);
        this.errorCodes = errorCodes;
    };

    validateParams({kingdomId,locationCode}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        if (!locationCode) throw new Error(this.errorCodes.missingLocationCode);
    };

    async attachLocation({kingdomId,locationCode}) {
        this.validateParams({kingdomId,locationCode});

        if ((await this.kingdom.get()).find( kingdom => kingdom.location === locationCode )) throw new Error(this.errorCodes.usedLocationCode);
        
        let kingdomData = await this.getById({kingdomId});
        if (kingdomData.location.country_code !== null ) throw new Error(this.errorCodes.usedKingdomId);
        kingdomData.location.country_code = locationCode;
        
        await this.location.add({kingdomId,locationCode});
        
        return kingdomData;
    };

    async getById({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const kingdom = (await this.kingdom.getById({kingdomId}))[0];
        let buildings = await this.buildings.getByKingdomId({kingdomId});
        buildings.forEach( e => {delete e.kingdom_id} );
        const resources = await this.resources.getByKingdomId({kingdomId});
        const troops = [];
        let kingdomData = {
            id: 0,
            name: '',
            userId: 0,
            buildings: [],
            resources: [],
            troops: [],
            location: { "country_code": null }
        };
            kingdomData.id = kingdom.kingdomId;
            kingdomData.name = kingdom.kingdomName;
            kingdomData.userId = kingdom.userId;
            kingdomData.buildings = buildings;
            kingdomData.resources = resources.map( e => ({"type": e.type,"amount": e.amount,"generation": e.generation}) );
            kingdomData.troops = troops;
            kingdomData.location.country_code = kingdom.location;
        return kingdomData;
    };

    async get() {
        return await this.kingdom.get();
    };

};
