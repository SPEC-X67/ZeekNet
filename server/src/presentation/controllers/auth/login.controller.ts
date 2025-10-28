import { Request, Response, NextFunction } from 'express';
import { LoginDto, GoogleLoginDto } from '../../../application/dto/auth';
import { ILoginUserUseCase, IAdminLoginUseCase, IGoogleLoginUseCase } from '../../../domain/interfaces/use-cases';
import { createRefreshTokenCookieOptions, handleValidationError, handleAsyncError, sendSuccessResponse } from '../../../shared/utils';
import { env } from '../../../infrastructure/config/env';

export class LoginController {
  constructor(
    private readonly _loginUserUseCase: ILoginUserUseCase,
    private readonly _adminLoginUseCase: IAdminLoginUseCase,
    private readonly _googleLoginUseCase: IGoogleLoginUseCase,
  ) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = LoginDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid login credentials', next);
    }

    try {
      const result = await this._loginUserUseCase.execute(parsed.data.email, parsed.data.password);

      if (result.tokens) {
        res.cookie(env.COOKIE_NAME_REFRESH!, result.tokens.refreshToken, createRefreshTokenCookieOptions());
        sendSuccessResponse(res, 'Login successful', result.user, result.tokens.accessToken);
      } else {
        sendSuccessResponse(res, 'Login successful, verification required', result.user, undefined);
      }
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = LoginDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid login credentials', next);
    }

    try {
      const result = await this._adminLoginUseCase.execute(parsed.data.email, parsed.data.password);

      if (result.tokens) {
        res.cookie(env.COOKIE_NAME_REFRESH!, result.tokens.refreshToken, createRefreshTokenCookieOptions());
        sendSuccessResponse(res, 'Admin login successful', result.user, result.tokens.accessToken);
      } else {
        sendSuccessResponse(res, 'Admin login successful', result.user, undefined);
      }
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = GoogleLoginDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid Google token', next);
    }

    try {
      const result = await this._googleLoginUseCase.execute(parsed.data.idToken);

      if (result.tokens) {
        res.cookie(env.COOKIE_NAME_REFRESH!, result.tokens.refreshToken, createRefreshTokenCookieOptions());
        sendSuccessResponse(res, 'Login successful', result.user, result.tokens.accessToken);
      } else {
        sendSuccessResponse(res, 'Login successful', result.user, undefined);
      }
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}
