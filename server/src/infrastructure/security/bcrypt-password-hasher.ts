import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import { PasswordHasher } from '../../application/interfaces';
import { env } from '../config/env';

@injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    const rounds = Number(env.BCRYPT_SALT_ROUNDS ?? '10');
    return bcrypt.hash(plain, rounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
