import { IUserRepository } from '../../../domain/interfaces/repositories';
import { IAuthGetUserByIdUseCase } from '../../../domain/interfaces/use-cases';
import { User } from '../../../domain/entities';

export class GetUserByIdUseCase implements IAuthGetUserByIdUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User | null> {
    return this._userRepository.findById(userId);
  }
}
