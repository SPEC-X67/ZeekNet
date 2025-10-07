import { Request, Response, NextFunction } from 'express';
import { RefreshTokenDto } from '../../../application/dto/auth';
import { RefreshTokenUseCase, AuthGetUserByIdUseCase } from '../../../application/use-cases';
import { ITokenService } from '../../../domain/interfaces/services';
import { GetCompanyProfileByUserIdUseCase } from '../../../application/use-cases/auth/get-company-profile-by-user-id.use-case';
import { BaseController, AuthenticatedRequest } from '../../../shared';
import { 
  createRefreshTokenCookieOptions, 
} from '../../../shared/utils';
import { env } from '../../../infrastructure/config/env';
import { UserRole } from '../../../domain/enums/user-role.enum';

export class TokenController extends BaseController {
  constructor(
    private readonly _refreshTokenUseCase: RefreshTokenUseCase,
    private readonly _getUserByIdUseCase: AuthGetUserByIdUseCase,
    private readonly _tokenService: ITokenService,
    private readonly _getCompanyProfileByUserIdUseCase: GetCompanyProfileByUserIdUseCase,
  ) {
    super();
  }

  refresh = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const cookieName = env.COOKIE_NAME_REFRESH || 'refresh_token';
    const fromCookie = (req as Request & { cookies?: Record<string, string> }).cookies?.[cookieName];
    
    const parsed = fromCookie
      ? { success: true, data: { refreshToken: fromCookie } }
      : RefreshTokenDto.safeParse(req.body);
      
    if (!parsed.success) {
      return this.handleValidationError('Invalid refresh token', next);
    }
    
    try {
      const result = await this._refreshTokenUseCase.execute(
        parsed.data.refreshToken,
      );
      const { tokens, user } = result;
      
      res.cookie(env.COOKIE_NAME_REFRESH!, tokens.refreshToken, createRefreshTokenCookieOptions());
      
      const userDetails = this.sanitizeUserForResponse(user);
      this.sendSuccessResponse(res, 'Token refreshed', userDetails, tokens.accessToken);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  checkAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = this.validateUserId(req);
      const user = await this._getUserByIdUseCase.execute(userId);
      
      if (!user) {
        return this.handleValidationError('User not found', next);
      }

      if (user.isBlocked) {
        return this.sendErrorResponse(res, 'User account is blocked', 403);
      }

      if (user.role === UserRole.COMPANY) {
        const companyProfile = await this._getCompanyProfileByUserIdUseCase.execute(user.id);
        if (companyProfile && companyProfile.isBlocked) {
          return this.sendErrorResponse(res, 'Company account is blocked', 403);
        }
      }

      const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role });
      const userDetails = this.sanitizeUserForResponse(user);
      
      this.sendSuccessResponse(res, 'Authenticated', userDetails, accessToken);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };
}
