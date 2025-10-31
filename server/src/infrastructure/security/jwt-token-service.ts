import jwt, { SignOptions } from 'jsonwebtoken';
import { ITokenPayload, ITokenService } from '../../domain/interfaces/services/ITokenService';
import { env } from '../config/env';

export class JwtTokenService implements ITokenService {
  signAccess(payload: ITokenPayload): string {
    const expiresIn = env.JWT_ACCESS_EXPIRES_IN as unknown as SignOptions['expiresIn'];
    return jwt.sign(payload as object, env.JWT_ACCESS_SECRET as string, {
      expiresIn,
    });
  }

  signRefresh(payload: ITokenPayload): string {
    const expiresIn = env.JWT_REFRESH_EXPIRES_IN as unknown as SignOptions['expiresIn'];
    return jwt.sign(payload as object, env.JWT_REFRESH_SECRET as string, {
      expiresIn,
    });
  }

  verifyAccess(token: string): ITokenPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET as string) as ITokenPayload;
  }

  verifyRefresh(token: string): ITokenPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET as string) as ITokenPayload;
  }
}