import { IUserRepository } from '../../../domain/interfaces/repositories';
import { NotFoundError } from '../../../domain/errors/errors';
import { UserMapper } from '../../mappers/user.mapper';
import { UserResponseDto } from '../../mappers/types';

export class GetUserByIdUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: UserMapper,
  ) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return this._userMapper.toDto(user);
  }
}
