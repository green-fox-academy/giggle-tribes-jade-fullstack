import { resourceService } from '../services/resourceService';

export const resourceMiddleware = async (req, res, next) => {
  try {
    await resourceService.generateResources(req.params.kingdomID);
    next();
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

