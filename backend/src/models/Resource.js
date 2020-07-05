import {
  insertResourceForKingdom,
  getResourceForKingdom,
  updateResourceForKingdom,
} from '../repos/resource';

export class Resource {
  kingdomID;
  type;
  amount;
  generation;
  updatedAt;

  constructor(kingdomID, type, amount) {
    this.kingdom = resource.results[0].kingdom_id;
    this.type = type;
    this.amount = amount;
    this.generation = 1;
    this.updatedAt = updatedAt;
  }
  getResource(kingdom, type, amount, generation) {
    return {
      type: this.type,
      amount: this.amount,
      generation: this.generation,
      updatedAt: this.updatedAt,
    };
  }
}
