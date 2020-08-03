import { kingdomRepo } from '../repos/kingdomRepo';
import { buildingRepo } from '../repos/buildingRepo';
import { resourceService, updateAmount } from './resourceService';

const errorMessages = {
  missingType: 1,
  wrongType: 2,
  notEnoughGold: 3,
  invalidId: 4
};

const defaultData = {
  farm : { hp : 1, cost : 100, time : 60000 },
  mine : { hp : 1, cost : 100, time : 60000 },
  academy : { hp : 1, cost : 100, time : 60000 }
}

const buildingData = (data) => {
  const start = new Date();
  const finish = new Date( start.getTime() + defaultData[data.type].time );
  return {
    id : null,
    kingdomId : data.kingdomId,
    type : data.type,
    level : 1,
    hp : defaultData[data.type].hp,
    started_at : start.toLocaleString(),
    finished_at : finish.toLocaleString()
    }
};

const formatData = (id,data) => ({
  id : id,
  kingdomId : data.kingdomId,
  type : data.type,
  level : data.level,
  hp : data.hp,
  started_at : new Date(data.started_at).getTime(),
  finished_at : new Date(data.finished_at).getTime()
});


const validateType = (type) => {
  if( !type ) throw new Error(errorMessages.missingType);
  if( !['farm','mine','academy'].includes(type) ) throw new Error(errorMessages.wrongType);
};

const validateKingdomId = async (id) => {
  const kingdomBase = await kingdomRepo.getKingdomBaseData({'kingdom_id' : id});
  if ( kingdomBase.length === 0 ) throw new Error(errorMessages.invalidId);
};

const validateGoldAmount = async (id,type) => {
  const resources = await resourceService.getResource(id);
  const gold = resources.resources.filter(e => e.type === 'gold')[0].amount;
  if ( gold < defaultData[type].cost ) throw new Error(errorMessages.notEnoughGold);
  return gold - defaultData[type].cost;
};


const add = async (input) => {
    validateType(input.type);
    await validateKingdomId(input.kingdomId);
    const goldAmount = await validateGoldAmount({kingdomID:input.kingdomId},input.type);
    const buildingDataInput = buildingData(input);
    const buildingId = await buildingRepo.add( buildingDataInput );
    await updateAmount({kingdomId:input.kingdomId,type:'gold',amount:goldAmount});
    return formatData(buildingId,buildingDataInput);
};

export const buildingService = {
    add,
    errorMessages
};
