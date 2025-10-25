import { IUserRepository } from '../../../domain/interfaces/repositories';
import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/errors';

export class GetUserByEmailUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(email: string): Promise<User | null> {
    try {
      if (!email) {
        throw new AppError('Email is required', 400);
      }

      const user = await this._userRepository.findByEmail(email);
      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to get user by email', 500);
    }
  }
}
