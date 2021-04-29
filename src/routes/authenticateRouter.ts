import { Router, Request, Response } from 'express';
import AuthenticateService from '../services/AuthenticateService';

const authenticateRouter = Router();

authenticateRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { userId, password } = request.body;

    const user = new AuthenticateService();

    const checkedUser = await user.validateUser(userId, password);

    delete checkedUser.passwordCurrent;
    delete checkedUser.passwordOld;
    delete checkedUser.indexPassword;

    return response.status(200).json(checkedUser);
  } catch (err) {
    return response.status(400).json({ msg: err.message });
  }
});

authenticateRouter.post(
  '/initial',
  async (request: Request, response: Response) => {
    try {
      const { userId, passwordOld, passwordNew } = request.body;

      const user = new AuthenticateService();

      const checkUser = await user.validatefirstLogon(
        userId,
        passwordOld,
        passwordNew,
      );

      delete checkUser.user.passwordCurrent;
      delete checkUser.user.passwordOld;
      delete checkUser.user.indexPassword;

      return response.status(200).json(checkUser);
    } catch (err) {
      return response.status(400).json({ msg: err.message });
    }
  },
);

export default authenticateRouter;
