import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { TYPES } from '../../../infrastructure/di/types';
import { RefreshTokenDto } from '../../../application/dto/auth';
import { RefreshTokenUseCase, AuthGetUserByIdUseCase } from '../../../application/use-cases';
import { TokenService } from '../../../application/interfaces/infrastructure';
import { ICompanyRepository } from '../../../domain/repositories';
import { BaseController, AuthenticatedRequest } from '../../../shared';
import { 
  createRefreshTokenCookieOptions, 
} from '../../../shared/utils';
import { env } from '../../../infrastructure/config/env';
import { UserRole } from '../../../domain/enums/user-role.enum';

@injectable()
export class TokenController extends BaseController {
  constructor(
    @inject(TYPES.RefreshTokenUseCase) private readonly refreshTokenUseCase: RefreshTokenUseCase,
    @inject(TYPES.GetUserByIdUseCase) private readonly getUserByIdUseCase: AuthGetUserByIdUseCase,
    @inject(TYPES.TokenService) private readonly tokenService: TokenService,
    @inject(TYPES.CompanyRepository) private readonly companyRepository: ICompanyRepository,
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
      const result = await this.refreshTokenUseCase.execute(
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
      const user = await this.getUserByIdUseCase.execute(userId);
      
      if (!user) {
        return this.handleValidationError('User not found', next);
      }

      // Check if user is blocked and return appropriate response
      if (user.isBlocked) {
        return this.sendErrorResponse(res, 'User account is blocked', 403);
      }

      // Check if company profile is blocked for company users
      if (user.role === UserRole.COMPANY) {
        const companyProfile = await this.companyRepository.getProfileByUserId(user.id);
        if (companyProfile && companyProfile.isBlocked) {
          return this.sendErrorResponse(res, 'Company account is blocked', 403);
        }
      }

      const accessToken = this.tokenService.signAccess({ sub: user.id, role: user.role });
      const userDetails = this.sanitizeUserForResponse(user);
      
      this.sendSuccessResponse(res, 'Authenticated', userDetails, accessToken);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };
}
