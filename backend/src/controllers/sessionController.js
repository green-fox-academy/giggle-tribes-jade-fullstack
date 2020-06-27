import { sessionService } from '../services';

export const sessionController = {
  async post(req, res) {
    let data = await sessionService.checkLogin(req.body);

    res.status(200).json(data);
  },
};
