import { IUserRepositoryFull } from '../../../domain/interfaces/repositories';

export class LogoutUseCase {
  constructor(
    private readonly _userRepository: IUserRepositoryFull,
  ) {}

  async execute(userId: string): Promise<void> {
    await this._userRepository.updateRefreshToken(userId, null);
  }
}
