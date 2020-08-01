let errorTypes = {
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

const validateType = (type) => {
  if( !type ) throw new Error(errorTypes.missingType);
  if( !['farm','mine','academy'].includes(type) ) throw new Error(errorTypes.wrongType);
};

const add = async (input) => {
    validateType(input.type);
    return buildingData(input);
};

export const buildingService = {
    add,
    errorTypes
};
