import { injectable, inject } from 'inversify';
import { LoginResult } from '../../dto/auth/auth-response.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull } from '../../../domain/repositories';
import { PasswordHasher, TokenService, GoogleTokenVerifier, OtpService, MailerService } from '../../interfaces/infrastructure';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { otpVerificationTemplate } from '../../../infrastructure/messaging/templates/otp-verification.template';

@injectable()
export class GoogleLoginUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,
    @inject(TYPES.TokenService)
    private readonly tokenService: TokenService,
    @inject(TYPES.GoogleTokenVerifier)
    private readonly googleVerifier: GoogleTokenVerifier,
    @inject(TYPES.OtpService)
    private readonly otpService: OtpService,
    @inject(TYPES.MailerService)
    private readonly mailerService: MailerService,
  ) {}

  async execute(idToken: string): Promise<LoginResult> {
    const profile = await this.googleVerifier.verifyIdToken(idToken);
    let user = await this.userRepository.findByEmail(profile.email);
    if (!user) {
      user = await this.userRepository.save({
        name: profile.name,
        email: profile.email,
        password: await this.passwordHasher.hash('oauth-google'),
        role: UserRole.SEEKER,
        isVerified: profile.emailVerified,
        isBlocked: false,
        refreshToken: null,
      });
    }

    const accessToken = this.tokenService.signAccess({ sub: user.id, role: user.role });
    const refreshToken = this.tokenService.signRefresh({ sub: user.id });
    const hashedRefresh = await this.passwordHasher.hash(refreshToken);
    await this.userRepository.updateRefreshToken(user.id, hashedRefresh);
    return { tokens: { accessToken, refreshToken }, user };
  }
}
