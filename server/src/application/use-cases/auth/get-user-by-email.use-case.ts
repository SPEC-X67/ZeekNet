import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull } from '../../../domain/repositories';
import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/errors';

@injectable()
export class GetUserByEmailUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
  ) {}

  async execute(email: string): Promise<User | null> {
    try {
      if (!email) {
        throw new AppError('Email is required', 400);
      }

      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to get user by email', 500);
    }
  }
}
