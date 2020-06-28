import { sessionService } from '../services';

export const sessionController = {
  async post(req, res) {
    let data = await sessionService.login(req.body);

    res.status(data.status).json(data.message); //status needs to be changed 401 or 200
  },
};
