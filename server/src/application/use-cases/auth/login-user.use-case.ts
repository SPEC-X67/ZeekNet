import { LoginResult } from '../../dto/auth/auth-response.dto';
import { IUserRepository, IUserAuthRepository } from '../../../domain/interfaces/repositories';
import { IPasswordHasher, ITokenService, IOtpService, IMailerService } from '../../../domain/interfaces/services';
import { ILoginUserUseCase } from '../../../domain/interfaces/use-cases';
import { AuthenticationError, AuthorizationError } from '../../../domain/errors/errors';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { otpVerificationTemplate } from '../../../infrastructure/messaging/templates/otp-verification.template';
import { UserMapper } from '../../mappers';

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userAuthRepository: IUserAuthRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenService: ITokenService,
    private readonly _otpService: IOtpService,
    private readonly _mailerService: IMailerService,
  ) {}

  async execute(email: string, password: string): Promise<LoginResult> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    if (!user.isVerified) {
      const code = await this._otpService.generateAndStoreOtp(user.email);
      const htmlContent = otpVerificationTemplate.html(code);
      await this._mailerService.sendMail(user.email, otpVerificationTemplate.subject, htmlContent);
      return { user: UserMapper.toDto(user) };
    }

    if (user.isBlocked) {
      throw new AuthorizationError('User is blocked. Contact support for assistance.');
    }

    if (user.role === UserRole.ADMIN) {
      throw new AuthenticationError('Please use admin login endpoint');
    }

    const isPasswordValid = await this._passwordHasher.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role });
    const refreshToken = this._tokenService.signRefresh({ sub: user.id });
    const hashedRefresh = await this._passwordHasher.hash(refreshToken);
    await this._userAuthRepository.updateRefreshToken(user.id, hashedRefresh);

    return {
      tokens: { accessToken, refreshToken },
      user: UserMapper.toDto(user),
    };
  }
}
