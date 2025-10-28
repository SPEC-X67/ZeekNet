import { Request, Response, NextFunction } from 'express';
import { RefreshTokenDto } from '../../../application/dto/auth';
import { IRefreshTokenUseCase, IAuthGetUserByIdUseCase, IGetCompanyProfileByUserIdUseCase } from '../../../domain/interfaces/use-cases';
import { ITokenService } from '../../../domain/interfaces/services';
import { AuthenticatedRequest } from '../../../shared/types';
import { createRefreshTokenCookieOptions, handleValidationError, handleAsyncError, validateUserId, sendSuccessResponse, sendErrorResponse } from '../../../shared/utils';
import { env } from '../../../infrastructure/config/env';
import { UserRole } from '../../../domain/enums/user-role.enum';

export class TokenController {
  constructor(
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly _getUserByIdUseCase: IAuthGetUserByIdUseCase,
    private readonly _tokenService: ITokenService,
    private readonly _getCompanyProfileByUserIdUseCase: IGetCompanyProfileByUserIdUseCase,
  ) {}

  refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cookieName = env.COOKIE_NAME_REFRESH || 'refresh_token';
    const fromCookie = (req as Request & { cookies?: Record<string, string> }).cookies?.[cookieName];

    const parsed = fromCookie ? { success: true, data: { refreshToken: fromCookie } } : RefreshTokenDto.safeParse(req.body);

    if (!parsed.success) {
      return handleValidationError('Invalid refresh token', next);
    }

    try {
      const result = await this._refreshTokenUseCase.execute(parsed.data.refreshToken);

      if (result.tokens) {
        res.cookie(env.COOKIE_NAME_REFRESH!, result.tokens.refreshToken, createRefreshTokenCookieOptions());
        sendSuccessResponse(res, 'Token refreshed', result.user, result.tokens.accessToken);
      } else {
        sendSuccessResponse(res, 'Token refreshed', result.user, undefined);
      }
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  checkAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const user = await this._getUserByIdUseCase.execute(userId);

      if (!user) {
        return handleValidationError('User not found', next);
      }

      if (user.isBlocked) {
        return sendErrorResponse(res, 'User account is blocked', null, 403);
      }

      if (user.role === UserRole.COMPANY) {
        const companyProfile = await this._getCompanyProfileByUserIdUseCase.execute(user.id);
        if (companyProfile && companyProfile.isBlocked) {
          return sendErrorResponse(res, 'Company account is blocked', null, 403);
        }
      }

      const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role as any });

      sendSuccessResponse(res, 'Authenticated', user, accessToken);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}
