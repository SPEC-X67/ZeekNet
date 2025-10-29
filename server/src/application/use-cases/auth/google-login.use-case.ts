import { LoginResult } from '../../dto/auth/auth-response.dto';
import { IUserRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { IUserAuthRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { IPasswordHasher } from '../../../domain/interfaces/services/IPasswordHasher';
import { ITokenService } from '../../../domain/interfaces/services/ITokenService';
import { IGoogleTokenVerifier } from '../../../domain/interfaces/services/IGoogleTokenVerifier';
import { IOtpService } from '../../../domain/interfaces/services/IOtpService';
import { IMailerService } from '../../../domain/interfaces/services/IMailerService';
import { IGoogleLoginUseCase } from '../../../domain/interfaces/use-cases/IAuthUseCases';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { otpVerificationTemplate } from '../../../infrastructure/messaging/templates/otp-verification.template';
import { UserMapper } from '../../mappers/user.mapper';

export class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userAuthRepository: IUserAuthRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenService: ITokenService,
    private readonly _googleVerifier: IGoogleTokenVerifier,
    private readonly _otpService: IOtpService,
    private readonly _mailerService: IMailerService,
  ) {}

  async execute(idToken: string): Promise<LoginResult> {
    const profile = await this._googleVerifier.verifyIdToken(idToken);
    let user = await this._userRepository.findByEmail(profile.email);
    if (!user) {
      user = await this._userRepository.save({
        name: profile.name,
        email: profile.email,
        password: await this._passwordHasher.hash('oauth-google'),
        role: UserRole.SEEKER,
        isVerified: profile.emailVerified,
        isBlocked: false,
        refreshToken: null,
      });
    }

    const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role });
    const refreshToken = this._tokenService.signRefresh({ sub: user.id });
    const hashedRefresh = await this._passwordHasher.hash(refreshToken);
    await this._userAuthRepository.updateRefreshToken(user.id, hashedRefresh);
    return { tokens: { accessToken, refreshToken }, user: UserMapper.toDto(user) };
  }
}
