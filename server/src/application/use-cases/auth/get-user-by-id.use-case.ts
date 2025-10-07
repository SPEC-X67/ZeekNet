import { IUserRepository } from '../../../domain/interfaces/repositories';
import { User } from '../../../domain/entities';

export class GetUserByIdUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User | null> {
    return this._userRepository.findById(userId);
  }
}
