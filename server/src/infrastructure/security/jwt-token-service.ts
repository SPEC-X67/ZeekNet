import { injectable } from 'inversify';
import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenPayload, TokenService } from '../../application/interfaces';
import { env } from '../config/env';

@injectable()
export class JwtTokenService implements TokenService {
  signAccess(payload: TokenPayload): string {
    const expiresIn =
      env.JWT_ACCESS_EXPIRES_IN as unknown as SignOptions['expiresIn'];
    return jwt.sign(payload as object, env.JWT_ACCESS_SECRET as string, {
      expiresIn,
    });
  }

  signRefresh(payload: TokenPayload): string {
    const expiresIn =
      env.JWT_REFRESH_EXPIRES_IN as unknown as SignOptions['expiresIn'];
    return jwt.sign(payload as object, env.JWT_REFRESH_SECRET as string, {
      expiresIn,
    });
  }

  verifyAccess(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET as string) as TokenPayload;
  }

  verifyRefresh(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET as string) as TokenPayload;
  }
}
