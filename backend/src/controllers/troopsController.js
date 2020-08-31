import { troopsService } from '../services';

export const troopsController = {
  async post(req, res) {
    try {
      const data = await troopsService.addTroop(req.params);

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async get(req, res) {
    try {
      const data = await troopsService.getTroops(req.params);

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
