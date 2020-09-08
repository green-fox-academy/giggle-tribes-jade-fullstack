export class TroopService {

    constructor({TroopRepo,ResourceService,ResourceRepo,db,errorCodes}) {
        this.troop = new TroopRepo(db,errorCodes);
        this.resources = new ResourceService({ResourceRepo,db,errorCodes});
        this.errorCodes = errorCodes;
        this.troopData = {};
        this.troopStats = {
            troop : { cost : 10, hp : 1, attack : 1, defence : 1, time : 60000, gen : -1 },
            troopLimit : 100
        };
    };

    setTroopData({kingdomId}) {
        const start = new Date();
        const finish = new Date( start.getTime() + this.troopStats['troop'].time );
        this.troopData = {
            id : null,
            kingdomId : kingdomId,
            level : 1,
            hp : this.troopStats['troop'].hp,
            attack : this.troopStats['troop'].attack,
            defence : this.troopStats['troop'].defence,
            started_at : start.toLocaleString(),
            finished_at : finish.toLocaleString()
        };
    };

    async add({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);

        const troopsNumber = (await this.getByKingdomId({kingdomId})).length;
        if ( troopsNumber >= this.troopStats.troopLimit ) throw new Error(this.errorCodes.usedKingdomId);

        const resources = await this.resources.getByKingdomId({kingdomId});
        const gold = resources.filter(e => e.type === 'gold')[0].amount;
        const {cost,gen} = this.troopStats['troop']; 
        if ( gold < cost ) throw new Error(this.errorCodes.invalidResourceAmount);

        this.setTroopData({kingdomId});
        this.troopData.id = (await this.troop.add(this.troopData)).insertId;

        await this.resources.spendGold({kingdomId,amount:cost});
        await this.resources.updateFoodGeneration({kingdomId,generation:gen});

        return this.troopData;
    };

    async getByKingdomId({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        return await this.troop.getByKingdomId({kingdomId});
    };

};
