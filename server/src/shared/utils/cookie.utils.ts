import { env } from '../../infrastructure/config/env';

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  path: string;
  maxAge: number;
  domain?: string;
}

export const createCookieOptions = (maxAge?: number): CookieOptions => {
  const options: CookieOptions = {
    httpOnly: true,
    secure: env.COOKIE_SECURE === 'true',
    sameSite: env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none',
    path: '/',
    maxAge: maxAge || 7 * 24 * 60 * 60 * 1000, 
  };

  if (env.COOKIE_DOMAIN) {
    options.domain = env.COOKIE_DOMAIN;
  }

  return options;
};

export const createRefreshTokenCookieOptions = (): CookieOptions => {
  return createCookieOptions(7 * 24 * 60 * 60 * 1000); // 7 days
};

export const createLogoutCookieOptions = (): Partial<CookieOptions> => {
  const options: Partial<CookieOptions> = {
    httpOnly: true,
    secure: env.COOKIE_SECURE === 'true',
    sameSite: env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none',
    path: '/',
  };

  if (env.COOKIE_DOMAIN) {
    options.domain = env.COOKIE_DOMAIN;
  }

  return options;
};
