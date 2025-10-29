import { LoginResult } from '../../dto/auth/auth-response.dto';
import { IUserRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { IUserAuthRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { ITokenService } from '../../../domain/interfaces/services/ITokenService';
import { IPasswordHasher } from '../../../domain/interfaces/services/IPasswordHasher';
import { IRefreshTokenUseCase } from '../../../domain/interfaces/use-cases/IAuthUseCases';
import { AuthenticationError, NotFoundError, AuthorizationError } from '../../../domain/errors/errors';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { UserMapper } from '../../mappers/user.mapper';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userAuthRepository: IUserAuthRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
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

    const isTokenValid = await this._passwordHasher.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) {
      throw new AuthenticationError('Invalid refresh token');
    }

    if (user.isBlocked) {
      throw new AuthorizationError('User account is blocked');
    }

    if (user.role === UserRole.COMPANY) {
      const companyProfile = await this._companyProfileRepository.getProfileByUserId(user.id);
      if (companyProfile && companyProfile.isBlocked) {
        throw new AuthorizationError('Company account is blocked');
      }
    }

    const accessToken = this._tokenService.signAccess({ sub: user.id, role: user.role });
    const newRefreshToken = this._tokenService.signRefresh({ sub: user.id });
    const hashedNewRefresh = await this._passwordHasher.hash(newRefreshToken);
    await this._userAuthRepository.updateRefreshToken(user.id, hashedNewRefresh);

    return {
      tokens: { accessToken, refreshToken: newRefreshToken },
      user: UserMapper.toDto(user),
    };
  }
}
