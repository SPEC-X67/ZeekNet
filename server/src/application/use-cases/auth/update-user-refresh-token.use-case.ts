import { IUserRepositoryFull } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';

export class UpdateUserRefreshTokenUseCase {
  constructor(
    private readonly _userRepository: IUserRepositoryFull,
  ) {}

  async execute(userId: string, hashedRefreshToken: string): Promise<void> {
    try {
      if (!userId) {
        throw new AppError('User ID is required', 400);
      }

      if (!hashedRefreshToken) {
        throw new AppError('Hashed refresh token is required', 400);
      }

      await this._userRepository.updateRefreshToken(userId, hashedRefreshToken);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user refresh token', 500);
    }
  }
}
