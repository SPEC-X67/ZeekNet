import { IUserRepository } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';
import { UserMapper } from '../../mappers';
import { UserResponseDto } from '../../dto/auth/user-response.dto';

export class GetUserByEmailUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(email: string): Promise<UserResponseDto | null> {
    try {
      if (!email) {
        throw new AppError('Email is required', 400);
      }

      const user = await this._userRepository.findByEmail(email);
      return user ? UserMapper.toDto(user) : null;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to get user by email', 500);
    }
  }
}
