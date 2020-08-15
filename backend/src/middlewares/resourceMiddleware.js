import { resourceService } from '../services/resourceService';

export const resourceMiddleware = async (req, res, next) => {
  try {
    await resourceService.updateResource(req.params);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
