import { Request, Response, NextFunction } from 'express';
import { LoginDto, GoogleLoginDto } from '../../../application/dto/auth';
import { ILoginUserUseCase, IAdminLoginUseCase, IGoogleLoginUseCase, IUpdateUserRefreshTokenUseCase } from '../../../domain/interfaces/use-cases';
import { ITokenService, IPasswordHasher } from '../../../domain/interfaces/services';
import { createRefreshTokenCookieOptions, handleValidationError, handleAsyncError, sendSuccessResponse } from '../../../shared/utils';
import { UserMapper } from '../../../application/mappers';
import { env } from '../../../infrastructure/config/env';

export class LoginController {
  constructor(
    private readonly _loginUserUseCase: ILoginUserUseCase,
    private readonly _adminLoginUseCase: IAdminLoginUseCase,
    private readonly _googleLoginUseCase: IGoogleLoginUseCase,
    private readonly _tokenService: ITokenService,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _updateUserRefreshTokenUseCase: IUpdateUserRefreshTokenUseCase
  ) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = LoginDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid login credentials', next);
    }

    try {
      const { user } = await this._loginUserUseCase.execute(parsed.data.email, parsed.data.password);

      if (user.isVerified) {
        const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role });
        const refreshToken = this._tokenService.signRefresh({ sub: user.id });
        const hashedRefresh = await this._passwordHasher.hash(refreshToken);

        await this._updateUserRefreshTokenUseCase.execute(user.id, hashedRefresh);

        res.cookie(env.COOKIE_NAME_REFRESH!, refreshToken, createRefreshTokenCookieOptions());

        const userDetails = UserMapper.toDto(user);
        sendSuccessResponse(res, 'Login successful', userDetails, accessToken);
      } else {
        const userDetails = UserMapper.toDto(user);
        sendSuccessResponse(res, 'Login successful, verification required', userDetails, undefined);
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
      const { tokens, user } = await this._adminLoginUseCase.execute(parsed.data.email, parsed.data.password);

      res.cookie(env.COOKIE_NAME_REFRESH!, tokens.refreshToken, createRefreshTokenCookieOptions());

      const userDetails = UserMapper.toDto(user);
      sendSuccessResponse(res, 'Admin login successful', userDetails, tokens.accessToken);
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
      const { tokens, user } = await this._googleLoginUseCase.execute(parsed.data.idToken);

      res.cookie(env.COOKIE_NAME_REFRESH!, tokens.refreshToken, createRefreshTokenCookieOptions());

      const userDetails = UserMapper.toDto(user);
      sendSuccessResponse(res, 'Login successful', userDetails, tokens.accessToken);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}
