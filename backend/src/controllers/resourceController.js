import { resourceService } from '../services';

export const resourceController = {
  async get(req, res) {
    try {
      const data = await resourceService.getResource(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
