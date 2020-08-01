import { kingdomRepo } from '../repos/kingdomRepo';
import { resourceService } from './resourceService';

const errorMessages = {
  missingType: 1,
  wrongType: 2,
  notEnoughGold: 3,
  invalidId: 4
};

const buildingData = (data) => ({
  "id" : 2,
  "type" : data.type,
  "level": 1,
  "hp": 1,
  "started_at": 12345789,
  "finished_at": 12399999
});

const buildCost = 100;

const validateType = (type) => {
  if( !type ) throw new Error(errorMessages.missingType);
  if( !['farm','mine','academy'].includes(type) ) throw new Error(errorMessages.wrongType);
};

const validateKingdomId = async (id) => {
  const kingdomBase = await kingdomRepo.getKingdomBaseData({'kingdom_id' : id});
  if ( kingdomBase.length === 0 ) throw new Error(errorMessages.invalidId);
};

const validateGoldAmount = async (id) => {
  const resources = await resourceService.getResource(id);
  const gold = resources.resources.filter(e => e.type === 'gold')[0].amount;
  if ( gold < buildCost ) throw new Error(errorMessages.notEnoughGold);
};


const add = async (input) => {
    validateType(input.type);
    await validateKingdomId(input.kingdomId);
    await validateGoldAmount({kingdomID:input.kingdomId});
    return buildingData(input);
};

export const buildingService = {
    add,
    errorMessages
};
