export class ResourceSpender {

    constructor({ResourceService,ResourceRepo,db,errorCodes}) {
        this.resources = new ResourceService({ResourceRepo,db,errorCodes});
        this.errorCodes = errorCodes;
        this.kingdomId = '';
        this.cost = 0;
        this.res = '';
        this.gen = 0;
    };

    async setResources(kingdomId,productType) {

        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);

        const {cost, res, gen} = this.resourceStats[productType];
        const resources = await this.resources.getByKingdomId({kingdomId});
        const gold = resources.filter(e => e.type === 'gold')[0].amount;
        if ( gold < cost ) throw new Error(this.errorCodes.invalidResourceAmount);

        this.kingdomId = kingdomId;
        this.cost = cost;
        this.res = res;
        this.gen = gen;

    };

    async spendResources() {

        await this.resources.spendGold({kingdomId: this.kingdomId, amount: this.cost});
        if (this.res === 'gold') await this.resources.updateGoldGeneration({kingdomId:this.kingdomId, generation: this.gen});
        if (this.res === 'food') await this.resources.updateFoodGeneration({kingdomId:this.kingdomId, generation: this.gen});

    };

};
