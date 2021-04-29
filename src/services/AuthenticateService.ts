import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import StatusUserEnum from '../enum/StatusUserEnum';
import { add, isAfter } from 'date-fns';

import PasswordService from '../services/PasswordServices';

interface ResponseDTO {
  user: User;
  strength: number;
}

class AuthenticateService {
  public async validateUser(userId: string, password: string): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { userId } });

    if (!user) {
      throw new Error('User not exists!');
    } else if (user.status !== StatusUserEnum.DISABLE) {
      if (!user) {
        throw new Error('Incorrect email/password combination.');
      }

      if (user.status == StatusUserEnum.PROVISIONAL) {
        const createdTime = user.updatedAt;
        const limitTime = add(createdTime, {
          minutes: 30,
        });
        const actualDate = new Date();

        if (isAfter(actualDate, limitTime)) {
          user.status = StatusUserEnum.DISABLE;
          const userUpdated = await usersRepository.save(user);
          throw new Error(`Time limit was exceeded. Create new login!`);
        }
      }

      const passwordMatched = await compare(password, user.passwordCurrent);

      if (!passwordMatched) {
        throw new Error('Incorrect email/password combination.');
      }

      return user;
    } else {
      throw new Error(
        'User canceled because of time limit was exceeded. Create new login!',
      );
    }
  }

  //////////////////////******************************************//////////////////////////////
  //                FIRST LOGON               //
  //////////////////////******************************************//////////////////////////////
  public async validatefirstLogon(
    userId: string,
    passwordOld: string,
    passwordNew: string,
  ): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { userId } });

    if (user.status !== StatusUserEnum.DISABLE) {
      if (!user) {
        throw new Error('Incorrect email/password combination.');
      }

      if (user.status == StatusUserEnum.PROVISIONAL) {
        const createdTime = user.updatedAt;
        const limitTime = add(createdTime, {
          minutes: 30,
        });
        const actualDate = new Date();

        if (isAfter(actualDate, limitTime)) {
          if (user.indexPassword === false) {
            user.status = StatusUserEnum.DISABLE;
            const userUpdated = await usersRepository.save(user);
            throw new Error(`Time limit was exceeded. Create new login!`);
          } else {
            const randomPassword = await PasswordService.createPassword();

            const hashedPassword = await PasswordService.createHashPassword(
              randomPassword,
            );

            user.passwordCurrent = hashedPassword;
            const userUpdated = await usersRepository.save(user);
            throw new Error(
              `Time limit was exceeded. Click for recovery password again!`,
            );
          }
        }

        const passwordMatched = await compare(
          passwordOld,
          user.passwordCurrent,
        );

        if (user.indexPassword === true) {
          if (passwordNew == user.passwordOld) {
            throw new Error('Create a new password not equal last!');
          }
        }

        let strength = 0;
        if (!passwordMatched) {
          throw new Error('Incorrect email/password combination.');
        } else {
          if (passwordNew.match(/[a-z]/) && passwordNew.match(/[0-9]/)) {
            if (passwordNew.length <= 7) {
              strength += 10;
            } else if (passwordNew.length > 7) {
              strength += 25;
            }
            if (passwordNew.match(/[a-z]+/) && passwordNew.match(/[0-9]+/)) {
              //Check lower case and numbers
              strength += 10;
            }
            if (
              passwordNew.match(/[A-Z]+/) &&
              passwordNew.match(/[a-z]+/) &&
              passwordNew.match(/[0-9]+/)
            ) {
              //Check upper case, lower case and numbers
              strength += 20;
            }
            if (
              passwordNew.match(/\W+/) &&
              passwordNew.match(/[A-Z]+/) &&
              passwordNew.match(/[a-z]+/) &&
              passwordNew.match(/[0-9]+/)
            ) {
              //Check if exists metaCharacter
              strength += 30;
            }
          } else {
            throw new Error("Password haven't items required (alphanumeric)");
          }
        }

        const hashedPassword = await PasswordService.createHashPassword(
          passwordNew,
        );
        user.passwordCurrent = hashedPassword;
        user.status = StatusUserEnum.ENABLE;
        user.indexPassword = true;
        const userUpdated = await usersRepository.save(user);

        return {
          user: userUpdated,
          strength: strength,
        };
      } /* else {
        throw new Error(
          'Faça o logon através do link: http://localhost:3333/authenticate',
        );
      } */
    } else {
      throw new Error('User canceled. Create new login!');
    }
  }
}

export default AuthenticateService;
