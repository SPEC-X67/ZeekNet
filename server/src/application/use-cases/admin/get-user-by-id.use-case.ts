import { IUserRepository } from '../../../domain/interfaces/repositories';
import { IGetUserByIdUseCase } from '../../../domain/interfaces/use-cases';
import { NotFoundError } from '../../../domain/errors/errors';
import { User } from '../../../domain/entities/user.entity';

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}
