import { IUserAuthRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { IUpdateUserVerificationStatusUseCase } from '../../../domain/interfaces/use-cases/IAuthUseCases';
import { AppError } from '../../../domain/errors/errors';

export class UpdateUserVerificationStatusUseCase implements IUpdateUserVerificationStatusUseCase {
  constructor(private readonly _userAuthRepository: IUserAuthRepository) {}

  async execute(email: string, isVerified: boolean): Promise<void> {
    try {
      if (!email) {
        throw new AppError('Email is required', 400);
      }

      if (typeof isVerified !== 'boolean') {
        throw new AppError('isVerified must be a boolean value', 400);
      }

      await this._userAuthRepository.updateVerificationStatus(email, isVerified);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update user verification status', 500);
    }
  }
}