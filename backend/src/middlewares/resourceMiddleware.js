import {
  getResourceForKingdom,
  updateResourceForKingdom,
} from '../repos/resource';

export const resourceMiddleware = async (req, res, next) => {
  try {
    await updateResource(req.params);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateResource = async input => {
  const kingdomID = input.kingdomID;
  console.log(kingdomID);
  if (kingdomID) {
    const resources = await getResourceForKingdom(kingdomID);
    if (resources.length > 0) {
      await Promise.all(
        resources.map(async resource => {
          const newAmount = await calculateNewAmount(
            resource.amount,
            resource.generation,
            resource.updatedAt
          );

          await updateResourceForKingdom(
            kingdomID,
            resource.type,
            newAmount,
            resource.generation
          );
        })
      );
    } else {
      throw {
        error: 'UpdateResource failed. Resource for this kingdom not found.',
      };
    }
  } else {
    throw { error: 'Kingdom ID is required.' };
  }
};

const calculateTimeDifference = async updatedAt => {
  const currentTime = new Date();
  const timeDifferenceInMinutes = Math.floor((currentTime - updatedAt) / 60000);

  return timeDifferenceInMinutes;
};

const calculateNewAmount = async (currentAmount, generation, updatedAt) => {
  const newAmount =
    currentAmount + (await calculateTimeDifference(updatedAt)) * generation;
  return newAmount;
};
