import { randomBytes } from 'crypto';
import { hash } from 'bcryptjs';

class PasswordService {
  static async createPassword() {
    const randomPassword = randomBytes(5).toString('hex');
    return randomPassword;
  }

  static async createHashPassword(password: string) {
    const hashedPassword = await hash(password, 8);
    return hashedPassword;
  }
}

export default PasswordService;
