import { Request, Response, NextFunction } from 'express';
import { ForgotPasswordDto } from '../../../application/dto/auth/forgot-password.dto';
import { ResetPasswordDto } from '../../../application/dto/auth/reset-password.dto';
import { LogoutDto } from '../../../application/dto/auth/logout.dto';
import { IForgotPasswordUseCase, IResetPasswordUseCase, ILogoutUseCase } from '../../../domain/interfaces/use-cases/IAuthUseCases';
import { AuthenticatedRequest } from '../../../shared/types/authenticated-request';
import { createLogoutCookieOptions } from '../../../shared/utils/cookie.utils';
import { extractUserId, handleValidationError, sendSuccessResponse, handleAsyncError } from '../../../shared/utils/controller.utils';
import { env } from '../../../infrastructure/config/env';

export class PasswordController {
  constructor(
    private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _logoutUseCase: ILogoutUseCase,
  ) {}

  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = ForgotPasswordDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid email address', next);
    }

    try {
      await this._forgotPasswordUseCase.execute(parsed.data.email);
      sendSuccessResponse(res, 'Password reset link has been sent to your email.', null);
    } catch (error) {
      sendSuccessResponse(res, 'If the email exists, a password reset link has been sent.', null);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = ResetPasswordDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid reset data', next);
    }

    try {
      await this._resetPasswordUseCase.execute(parsed.data.token, parsed.data.newPassword);
      sendSuccessResponse(res, 'Password has been reset successfully', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const maybe = LogoutDto.safeParse(req.body);
      const userId = extractUserId(req) ?? (maybe.success ? maybe.data.userId : undefined);

      if (userId) {
        try {
          await this._logoutUseCase.execute(userId);
        } catch (_err) {}
      }

      res.clearCookie(env.COOKIE_NAME_REFRESH!, createLogoutCookieOptions());
      sendSuccessResponse(res, 'Logged out', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}
