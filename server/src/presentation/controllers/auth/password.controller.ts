import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { TYPES } from '../../../infrastructure/di/types';
import { ForgotPasswordDto, ResetPasswordDto, LogoutDto } from '../../../application/dto/auth';
import { ForgotPasswordUseCase, ResetPasswordUseCase, LogoutUseCase } from '../../../application/use-cases';
import { BaseController, AuthenticatedRequest } from '../../../shared';
import { 
  createLogoutCookieOptions,
} from '../../../shared/utils';
import { env } from '../../../infrastructure/config/env';

@injectable()
export class PasswordController extends BaseController {
  constructor(
    @inject(TYPES.ForgotPasswordUseCase) private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    @inject(TYPES.ResetPasswordUseCase) private readonly resetPasswordUseCase: ResetPasswordUseCase,
    @inject(TYPES.LogoutUseCase) private readonly logoutUseCase: LogoutUseCase,
  ) {
    super();
  }

  forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = ForgotPasswordDto.safeParse(req.body);
    if (!parsed.success) {
      return this.handleValidationError('Invalid email address', next);
    }
    
    try {
      await this.forgotPasswordUseCase.execute(parsed.data.email);
      this.sendSuccessResponse(res, 'Password reset link has been sent to your email.', null);
    } catch (error) {
      this.sendSuccessResponse(res, 'If the email exists, a password reset link has been sent.', null);
    }
  };

  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = ResetPasswordDto.safeParse(req.body);
    if (!parsed.success) {
      return this.handleValidationError('Invalid reset data', next);
    }
    
    try {
      await this.resetPasswordUseCase.execute(
        parsed.data.token,
        parsed.data.newPassword,
      );
      this.sendSuccessResponse(res, 'Password has been reset successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  logout = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const maybe = LogoutDto.safeParse(req.body);
      const userId = this.extractUserId(req) ?? (maybe.success ? maybe.data.userId : undefined);

      if (userId) {
        try {
          await this.logoutUseCase.execute(userId);
        } catch (_err) {}
      }
      
      res.clearCookie(env.COOKIE_NAME_REFRESH!, createLogoutCookieOptions());
      this.sendSuccessResponse(res, 'Logged out', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };
}
