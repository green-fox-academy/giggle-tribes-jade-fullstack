import {ResourceSpender} from './ResurceSpender';

export class TroopService extends ResourceSpender {

    constructor({TroopRepo,ResourceService,ResourceRepo,db,errorCodes}) {
        super({ResourceService,ResourceRepo,db,errorCodes});
        this.troop = new TroopRepo(db,errorCodes);
        this.troopData = {};
        this.troopStats = {
            troop : { hp : 1, attack : 1, defence : 1, time : 60000 },
            troopLimit : 100
        };
        this.resourceStats = {
            troop : { cost : 10, res: 'food', gen : -1 }
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

        await this.setResources(kingdomId,'troop');

        this.setTroopData({kingdomId});
        this.troopData.id = (await this.troop.add(this.troopData)).insertId;

        await this.spendResources();

        return this.troopData;
    };

    async getByKingdomId({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        return await this.troop.getByKingdomId({kingdomId});
    };

};
