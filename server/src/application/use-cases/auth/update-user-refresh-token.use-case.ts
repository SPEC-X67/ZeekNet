import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull } from '../../../domain/repositories';
import { AppError } from '../../../domain/errors/errors';

@injectable()
export class UpdateUserRefreshTokenUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
  ) {}

  async execute(userId: string, hashedRefreshToken: string): Promise<void> {
    try {
      if (!userId) {
        throw new AppError('User ID is required', 400);
      }

      if (!hashedRefreshToken) {
        throw new AppError('Hashed refresh token is required', 400);
      }

      await this.userRepository.updateRefreshToken(userId, hashedRefreshToken);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user refresh token', 500);
    }
  }
}
