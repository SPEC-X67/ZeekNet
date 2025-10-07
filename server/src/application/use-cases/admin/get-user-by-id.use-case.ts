import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepository } from '../../../domain/repositories';
import { NotFoundError } from '../../../domain/errors/errors';
import { UserMapper } from '../../mappers/user.mapper';
import { UserResponseDto } from '../../mappers/types';

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.UserMapper)
    private readonly userMapper: UserMapper,
  ) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return this.userMapper.toDto(user);
  }
}
