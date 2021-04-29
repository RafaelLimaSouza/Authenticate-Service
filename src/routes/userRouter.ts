import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import RecoveryPasswordService from '../services/RecoveryPasswordService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, userId, emailAddress } = request.body;

    if (!name || !userId || !emailAddress) {
      throw new Error('Empty fields!');
    }

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, userId, emailAddress });

    delete user.passwordCurrent;
    delete user.passwordOld;
    delete user.indexPassword;

    return response.status(200).json(user);
  } catch (err) {
    return response.status(400).json({ msg: err.message });
  }
});

usersRouter.post('/recovery', async (request: Request, response: Response) => {
  try {
    const { userId, emailAddress } = request.body;

    const oldUser = new RecoveryPasswordService();

    const user = await oldUser.execute({ userId, emailAddress });

    delete user.passwordCurrent;
    delete user.passwordOld;
    delete user.indexPassword;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ msg: err.message });
  }
});

export default usersRouter;
