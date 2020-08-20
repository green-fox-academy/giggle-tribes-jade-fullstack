import { TroopsService } from '../services';
import { getTroopsForKingdom, insertTroopForKingdom } from '../repos/troops';
import { resourceService } from '../services/resourceService';

export const troopsController = {
  async post(req, res) {
    try {
      const troopsService = new TroopsService({
        getTroopsForKingdom,
        insertTroopForKingdom,
        resourceService,
      });

      const data = await troopsService.addTroop(req.params);

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
