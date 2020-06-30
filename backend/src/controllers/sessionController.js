import { sessionService } from '../services';

export const sessionController = {
  async post(req, res) {
    try {
      const data = await sessionService.login(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).json(error);
    }
  },
};
