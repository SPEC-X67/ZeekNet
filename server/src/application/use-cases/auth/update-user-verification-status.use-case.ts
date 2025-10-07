import { IUserRepositoryFull } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';

export class UpdateUserVerificationStatusUseCase {
  constructor(
    private readonly _userRepository: IUserRepositoryFull,
  ) {}

  async execute(email: string, isVerified: boolean): Promise<void> {
    try {
      if (!email) {
        throw new AppError('Email is required', 400);
      }

      if (typeof isVerified !== 'boolean') {
        throw new AppError('isVerified must be a boolean value', 400);
      }

      await this._userRepository.updateVerificationStatus(email, isVerified);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user verification status', 500);
    }
  }
}
