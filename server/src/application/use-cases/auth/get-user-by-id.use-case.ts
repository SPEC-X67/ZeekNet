import { IUserRepository } from '../../../domain/interfaces/repositories';
import { IAuthGetUserByIdUseCase } from '../../../domain/interfaces/use-cases';
import { User } from '../../../domain/entities';
import { UserMapper } from '../../mappers';
import { UserResponseDto } from '../../dto/auth/user-response.dto';

export class GetUserByIdUseCase implements IAuthGetUserByIdUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserResponseDto | null> {
    const user = await this._userRepository.findById(userId);
    return user ? UserMapper.toDto(user) : null;
  }
}
