import { ResourceService } from '../services';
import { errorCodes, ResourceRepo } from '../repos';
import { db } from '../data/connection';

const resources = new ResourceService({ResourceRepo,db,errorCodes});

export const resourceMiddleware = async (req, res, next) => {
  const {kingdomId} = req.params;
  try {
    await resources.generateResources({kingdomId});
    next();
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

