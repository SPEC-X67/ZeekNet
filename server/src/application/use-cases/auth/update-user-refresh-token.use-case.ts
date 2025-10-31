import { IUserAuthRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { IUpdateUserRefreshTokenUseCase } from '../../../domain/interfaces/use-cases/IAuthUseCases';
import { AppError } from '../../../domain/errors/errors';

export class UpdateUserRefreshTokenUseCase implements IUpdateUserRefreshTokenUseCase {
  constructor(private readonly _userAuthRepository: IUserAuthRepository) {}

  async execute(userId: string, hashedRefreshToken: string): Promise<void> {
    try {
      if (!userId) {
        throw new AppError('User ID is required', 400);
      }

      if (!hashedRefreshToken) {
        throw new AppError('Hashed refresh token is required', 400);
      }

      await this._userAuthRepository.updateRefreshToken(userId, hashedRefreshToken);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user refresh token', 500);
    }
  }
}