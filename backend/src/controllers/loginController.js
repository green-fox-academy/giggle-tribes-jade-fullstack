import { loginService } from '../services';

export const loginController = {
  async post(req, res) {
    let data = await loginService.postLogin(
      req.body.username,
      req.body.password
    );

    res.status(200).json(data);
  },
};
