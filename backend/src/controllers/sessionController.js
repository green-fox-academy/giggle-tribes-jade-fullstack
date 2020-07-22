import { sessionService } from '../services';

export const sessionController = {
  async post(req, res) {
    try {
      const data = await sessionService.login(req.body);
      if (data.error) {
        res.status(401).json(data);
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(401).json(error);
    }
  },
};
