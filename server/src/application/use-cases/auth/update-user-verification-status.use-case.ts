import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull } from '../../../domain/repositories';
import { AppError } from '../../../domain/errors/errors';

@injectable()
export class UpdateUserVerificationStatusUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
  ) {}

  async execute(email: string, isVerified: boolean): Promise<void> {
    try {
      if (!email) {
        throw new AppError('Email is required', 400);
      }

      if (typeof isVerified !== 'boolean') {
        throw new AppError('isVerified must be a boolean value', 400);
      }

      await this.userRepository.updateVerificationStatus(email, isVerified);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user verification status', 500);
    }
  }
}
