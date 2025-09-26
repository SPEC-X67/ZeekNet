import { injectable, inject } from 'inversify';
import { LoginResult } from '../../dto/auth/auth-response.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull, ICompanyRepository } from '../../../domain/repositories';
import { PasswordHasher, TokenService, OtpService, MailerService } from '../../interfaces/infrastructure';
import { AuthenticationError, AuthorizationError } from '../../../domain/errors/errors';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { otpVerificationTemplate } from '../../../infrastructure/messaging/templates/otp-verification.template';

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,
    @inject(TYPES.TokenService)
    private readonly tokenService: TokenService,
    @inject(TYPES.OtpService)
    private readonly otpService: OtpService,
    @inject(TYPES.MailerService)
    private readonly mailerService: MailerService,
  ) {}

  async execute(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    if (!user.isVerified) {
      const code = await this.otpService.generateAndStoreOtp(user.email);
      const htmlContent = otpVerificationTemplate.html(code);
      await this.mailerService.sendMail(user.email, otpVerificationTemplate.subject, htmlContent);
    }

    if (user.isBlocked) {
      throw new AuthorizationError('User is blocked. Contact support for assistance.');
    }

    if (user.role === UserRole.ADMIN) {
      throw new AuthenticationError('Please use admin login endpoint');
    }

    // Check if company profile is blocked for company users
    if (user.role === UserRole.COMPANY) {
      const companyProfile = await this.companyRepository.getProfileByUserId(user.id);
      if (companyProfile && companyProfile.isBlocked) {
        throw new AuthorizationError('Company account is blocked. Contact support for assistance.');
      }
    }

    const isPasswordValid = await this.passwordHasher.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const accessToken = this.tokenService.signAccess({ sub: user.id, role: user.role });
    const refreshToken = this.tokenService.signRefresh({ sub: user.id });
    const hashedRefresh = await this.passwordHasher.hash(refreshToken);
    await this.userRepository.updateRefreshToken(user.id, hashedRefresh);

    return {
      tokens: { accessToken, refreshToken },
      user,
    };
  }
}
