import User from '../models/User';

import { getRepository } from 'typeorm';

import PasswordService from '../services/PasswordServices';
import MailService from './MailService';

import StatusUserEnum from '../enum/StatusUserEnum';

interface Request {
  userId: string;
  emailAddress: string;
}

class RecoveryPasswordService {
  public async execute({ userId, emailAddress }: Request): Promise<User> {
    const userRepository = getRepository(User);

    if (!userId) {
      throw new Error('Empty field');
    }

    const user = await userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    if (user.status === StatusUserEnum.DISABLE) {
      throw new Error('User canceled');
    }

    const randomPassword = await PasswordService.createPassword();

    const hashedPassword = await PasswordService.createHashPassword(
      randomPassword,
    );

    user.passwordOld = user.passwordCurrent;
    user.passwordCurrent = hashedPassword;
    user.status = StatusUserEnum.PROVISIONAL;

    await userRepository.save(user);

    user.passwordCurrent = randomPassword;

    await MailService.execute(user);

    return user;
  }
}

export default RecoveryPasswordService;
