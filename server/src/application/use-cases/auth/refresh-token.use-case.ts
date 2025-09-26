import { injectable, inject } from 'inversify';
import { LoginResult } from '../../dto/auth/auth-response.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull, ICompanyRepository } from '../../../domain/repositories';
import { TokenService, PasswordHasher } from '../../interfaces/infrastructure';
import { AuthenticationError, NotFoundError, AuthorizationError } from '../../../domain/errors/errors';
import { UserRole } from '../../../domain/enums/user-role.enum';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    @inject(TYPES.TokenService)
    private readonly tokenService: TokenService,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(refreshToken: string): Promise<LoginResult> {
    const payload = this.tokenService.verifyRefresh(refreshToken);
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (!user.refreshToken) {
      throw new AuthenticationError('Invalid refresh token');
    }
    
    // Compare the provided refresh token with the stored hashed token
    const isTokenValid = await this.passwordHasher.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) {
      throw new AuthenticationError('Invalid refresh token');
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw new AuthorizationError('User account is blocked');
    }

    // Check if company profile is blocked for company users
    if (user.role === UserRole.COMPANY) {
      const companyProfile = await this.companyRepository.getProfileByUserId(user.id);
      if (companyProfile && companyProfile.isBlocked) {
        throw new AuthorizationError('Company account is blocked');
      }
    }

    const accessToken = this.tokenService.signAccess({ sub: user.id, role: user.role });
    const newRefreshToken = this.tokenService.signRefresh({ sub: user.id });
    const hashedNewRefresh = await this.passwordHasher.hash(newRefreshToken);
    await this.userRepository.updateRefreshToken(user.id, hashedNewRefresh);

    return {
      tokens: { accessToken, refreshToken: newRefreshToken },
      user,
    };
  }
}
