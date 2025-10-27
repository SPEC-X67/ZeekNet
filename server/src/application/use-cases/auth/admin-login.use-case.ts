import { LoginResult } from '../../dto/auth/auth-response.dto';
import { IUserRepository, IUserAuthRepository } from '../../../domain/interfaces/repositories';
import { IPasswordHasher, ITokenService, IOtpService, IMailerService } from '../../../domain/interfaces/services';
import { IAdminLoginUseCase } from '../../../domain/interfaces/use-cases';
import { AuthenticationError, AuthorizationError } from '../../../domain/errors/errors';
import { UserRole } from '../../../domain/enums/user-role.enum';

export class AdminLoginUseCase implements IAdminLoginUseCase {
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

    if (user.isBlocked) {
      throw new AuthorizationError('User is blocked');
    }

    if (user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('Not authorized as admin');
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
      user,
    };
  }
}
