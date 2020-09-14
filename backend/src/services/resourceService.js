export class ResourceService {

    constructor({ResourceRepo,db,errorCodes}) {
        this.resources = new ResourceRepo(db,errorCodes);
        this.errorCodes = errorCodes;
    };

    async getByKingdomId({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        let resources = await this.resources.getByKingdomId({kingdomId});
        if (resources.length === 0) throw new Error(this.errorCodes.invalidKingdomId);

        resources.forEach( e => {
            delete e.kingdom_id;
            delete e.id;
        } );
        return { resources };
    };

    async add({kingdomId,startAmount = 0}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        let resources = await this.resources.getByKingdomId({kingdomId});
        if (resources.length !== 0) throw new Error(this.errorCodes.usedKingdomId);

        await this.resources.add({kingdomId,type:'gold',amount:startAmount,generation:0});
        await this.resources.add({kingdomId,type:'food',amount:startAmount,generation:0});
    };

    async generateResources({kingdomId}) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        let resources = await this.resources.getByKingdomId({kingdomId});
        if (resources.length === 0) throw new Error(this.errorCodes.invalidKingdomId);

        const currentTime = new Date();
        resources.forEach( async resource => {
            const minutes = Math.floor( (currentTime - new Date(resource.updatedAt)) / 60000 );
            const updateAmount = resource.amount + minutes * resource.generation;
            await this.resources.update({amount: updateAmount, generation: resource.generation, kingdomId, type : resource.type});
        });
    };

    async resourceUpdateFactory(kingdomId,resourceType) {
        if (!kingdomId) throw new Error(this.errorCodes.missingKingdomId);
        const resources = (await this.resources.getByKingdomId({kingdomId})).find(e => e.type === resourceType);
        const {amount,generation} = resources;
        return async (changeAmount,changeGeneration) => {
          await this.resources.update({amount: amount + changeAmount, generation: generation + changeGeneration, kingdomId, type : resourceType});
        };
    };
      
    async spendGold({kingdomId,amount = 0}) {
        await (await this.resourceUpdateFactory(kingdomId,'gold'))(-amount,0);
    };

    async spendFood({kingdomId,amount = 0}) {
        await (await this.resourceUpdateFactory(kingdomId,'food'))(-amount,0);
    };

    async updateGoldGeneration({kingdomId,generation = 0}) {
        await (await this.resourceUpdateFactory(kingdomId,'gold'))(0,generation);
    };

    async updateFoodGeneration({kingdomId,generation = 0}) {
        await (await this.resourceUpdateFactory(kingdomId,'food'))(0,generation);
    };

};
