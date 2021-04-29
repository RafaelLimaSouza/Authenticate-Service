import User from '../models/User';

import { getRepository } from 'typeorm';

import PasswordService from '../services/PasswordServices';
import MailService from './MailService';

import StatusUserEnum from '../enum/StatusUserEnum';

interface Request {
  name: string;
  userId: string;
  emailAddress: string;
}

class CreateUserService {
  public async execute({ name, userId, emailAddress }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserIdExists = await userRepository.findOne({
      where: { userId },
    });

    if (checkUserIdExists) {
      throw new Error('UserId already exists.');
    }

    const randomPassword = await PasswordService.createPassword();

    const hashedPassword = await PasswordService.createHashPassword(
      randomPassword,
    );

    const user = userRepository.create({
      name,
      userId,
      emailAddress,
      passwordCurrent: hashedPassword,
      passwordOld: hashedPassword,
      indexPassword: false,
      status: StatusUserEnum.PROVISIONAL,
    });

    await userRepository.save(user);

    user.passwordCurrent = randomPassword;

    await MailService.execute(user);

    return user;
  }
}

export default CreateUserService;
