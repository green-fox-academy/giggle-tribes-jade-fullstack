import { kingdomRepo } from '../repos/kingdomRepo';
import { buildingRepo } from '../repos/buildingRepo';
import { resourceService, updateAmount, updateGeneration } from './resourceService';

const errorMessages = {
  missingType: 1,
  wrongType: 2,
  notEnoughGold: 3,
  invalidId: 4
};

const defaultData = {
  farm : { hp : 1, cost : 100, time : 60000, gen : 5, genType : 'food' },
  mine : { hp : 1, cost : 100, time : 60000, gen : 5, genType : 'gold' },
  academy : { hp : 1, cost : 100, time : 60000, gen : 0, genType : '-' }
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

const checkResources = async (id,type) => {
  const resources = await resourceService.getResource(id);
  const gold = resources.resources.filter(e => e.type === 'gold')[0].amount;
  let generation = {};
  generation.mine = resources.resources.filter(e => e.type === 'gold')[0].generation;
  generation.farm = resources.resources.filter(e => e.type === 'food')[0].generation;
  generation.academy = 0;
  if ( gold < defaultData[type].cost ) throw new Error(errorMessages.notEnoughGold);
  return {
    amount: gold - defaultData[type].cost,
    generation: generation[type] + defaultData[type].gen,
    genType: defaultData[type].genType
  };
};


const add = async (input) => {
    validateType(input.type);
    await validateKingdomId(input.kingdomId);
    const resources = await checkResources({kingdomID:input.kingdomId},input.type);
    const buildingDataInput = buildingData(input);
    const buildingId = await buildingRepo.add( buildingDataInput );
    await updateAmount({kingdomId:input.kingdomId,type:'gold',amount:resources.amount});
    if (input.type !== 'academy') await updateGeneration({kingdomId:input.kingdomId,type:resources.genType,generation:resources.generation});
    return formatData(buildingId,buildingDataInput);
};

export const buildingService = {
    add,
    errorMessages
};
