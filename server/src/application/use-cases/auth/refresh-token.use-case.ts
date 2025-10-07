import { LoginResult } from '../../dto/auth/auth-response.dto';
import { IUserRepositoryFull, ICompanyRepository } from '../../../domain/interfaces/repositories';
import { ITokenService, IPasswordHasher } from '../../../domain/interfaces/services';
import { AuthenticationError, NotFoundError, AuthorizationError } from '../../../domain/errors/errors';
import { UserRole } from '../../../domain/enums/user-role.enum';

export class RefreshTokenUseCase {
  constructor(
    private readonly _userRepository: IUserRepositoryFull,
    private readonly _companyRepository: ICompanyRepository,
    private readonly _tokenService: ITokenService,
    private readonly _passwordHasher: IPasswordHasher,
  ) {}

  async execute(refreshToken: string): Promise<LoginResult> {
    const payload = this._tokenService.verifyRefresh(refreshToken);
    const user = await this._userRepository.findById(payload.sub);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (!user.refreshToken) {
      throw new AuthenticationError('Invalid refresh token');
    }
    
    // Compare the provided refresh token with the stored hashed token
    const isTokenValid = await this._passwordHasher.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) {
      throw new AuthenticationError('Invalid refresh token');
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw new AuthorizationError('User account is blocked');
    }

    // Check if company profile is blocked for company users
    if (user.role === UserRole.COMPANY) {
      const companyProfile = await this._companyRepository.getProfileByUserId(user.id);
      if (companyProfile && companyProfile.isBlocked) {
        throw new AuthorizationError('Company account is blocked');
      }
    }

    const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role });
    const newRefreshToken = this._tokenService.signRefresh({ sub: user.id });
    const hashedNewRefresh = await this._passwordHasher.hash(newRefreshToken);
    await this._userRepository.updateRefreshToken(user.id, hashedNewRefresh);

    return {
      tokens: { accessToken, refreshToken: newRefreshToken },
      user,
    };
  }
}
