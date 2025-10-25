import { Request, Response, NextFunction } from 'express';
import { IMailerService, IOtpService, IPasswordHasher, ITokenService } from '../../../domain/interfaces/services';
import { IGetUserByEmailUseCase, IUpdateUserVerificationStatusUseCase, IUpdateUserRefreshTokenUseCase } from '../../../domain/interfaces/use-cases';
import { z } from 'zod';
import { env } from '../../../infrastructure/config/env';
import { createRefreshTokenCookieOptions, handleValidationError, handleAsyncError, sendSuccessResponse, sendErrorResponse } from '../../../shared/utils';
import { UserMapper } from '../../../application/mappers';
import { welcomeTemplate } from '../../../infrastructure/messaging/templates/welcome.template';

const RequestOtpDto = z.object({ email: z.string().email() });
const VerifyOtpDto = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export class OtpController {
  constructor(
    private readonly _otpService: IOtpService,
    private readonly _mailer: IMailerService,
    private readonly _getUserByEmailUseCase: IGetUserByEmailUseCase,
    private readonly _updateUserVerificationStatusUseCase: IUpdateUserVerificationStatusUseCase,
    private readonly _updateUserRefreshTokenUseCase: IUpdateUserRefreshTokenUseCase,
    private readonly _tokenService: ITokenService,
    private readonly _passwordHasher: IPasswordHasher
  ) {}

  request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = RequestOtpDto.safeParse(req.body);
    if (!parsed.success) return handleValidationError('Invalid email', next);

    try {
      const user = await this._getUserByEmailUseCase.execute(parsed.data.email);
      if (!user) {
        return handleValidationError('User not found', next);
      }
      if (user.isVerified) {
        sendSuccessResponse(res, 'User already verified', null);
        return;
      }

      let code: string;
      try {
        code = await this._otpService.generateAndStoreOtp(parsed.data.email);
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('Please wait before requesting another OTP')) {
          sendErrorResponse(res, 'Please wait 30 seconds before requesting another OTP', null, 429);
          return;
        }
        throw error;
      }

      const htmlContent = `
        <table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border-collapse: collapse;">
          <tr>
            <td style="background-color: white; padding: 30px; text-align: center;">
              <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 24px;">Verify Your Email</h2>
              
              <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: left; margin: 0 0 20px 0;">Hello,</p>
              <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: left; margin: 0 0 20px 0;">Thanks for registering! Please use the verification code below to verify your email address:</p>
              
              <div style="background-color: #f8fafc; border-radius: 4px; padding: 20px; margin: 30px 0; text-align: center;">
                <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #2c3e50; letter-spacing: 4px;">${code}</span>
              </div>

              <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: left; margin: 20px 0 10px 0;"><strong>Please Note:</strong></p>
              <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: left; margin: 0 0 10px 0;">• This code will expire in 5 minutes</p>
              <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: left; margin: 0 0 20px 0;">• If you didn't request this code, please ignore this email</p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="color: #666; font-size: 14px; text-align: center;">This is an automated email, please do not reply.</p>
            </td>
          </tr>
        </table>
      `;

      await this._mailer.sendMail(parsed.data.email, 'Verify Your Email - ZeekNet Job Portal', htmlContent);
      sendSuccessResponse(res, 'OTP sent successfully', null);
    } catch (err) {
      handleAsyncError(err, next);
    }
  };

  verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = VerifyOtpDto.safeParse(req.body);
    if (!parsed.success) return handleValidationError('Invalid OTP data', next);

    try {
      const ok = await this._otpService.verifyOtp(parsed.data.email, parsed.data.code);
      if (!ok) return handleValidationError('Invalid or expired OTP', next);

      await this._updateUserVerificationStatusUseCase.execute(parsed.data.email, true);

      const user = await this._getUserByEmailUseCase.execute(parsed.data.email);
      if (!user) {
        return handleValidationError('User not found', next);
      }

      const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role });
      const refreshToken = this._tokenService.signRefresh({ sub: user.id });
      const hashedRefresh = await this._passwordHasher.hash(refreshToken);

      await this._updateUserRefreshTokenUseCase.execute(user.id, hashedRefresh);

      res.cookie(env.COOKIE_NAME_REFRESH!, refreshToken, createRefreshTokenCookieOptions());

      const dashboardLink = this.getDashboardLink(user.role);
      await this._mailer.sendMail(user.email, welcomeTemplate.subject, welcomeTemplate.html(user.name || 'User', dashboardLink));

      const userDetails = UserMapper.toDto(user);
      sendSuccessResponse(res, 'OTP verified and user verified', userDetails, accessToken);
    } catch (err) {
      handleAsyncError(err, next);
    }
  };

  private getDashboardLink(role: string): string {
    const baseUrl = env.FRONTEND_URL || 'http://localhost:3000';
    switch (role) {
      case 'admin':
        return `${baseUrl}/admin/dashboard`;
      case 'company':
        return `${baseUrl}/company/dashboard`;
      case 'seeker':
        return `${baseUrl}/seeker/dashboard`;
      default:
        return `${baseUrl}/seeker/dashboard`;
    }
  }
}
