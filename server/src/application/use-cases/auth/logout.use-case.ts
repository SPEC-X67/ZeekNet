import { IUserAuthRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { ILogoutUseCase } from '../../../domain/interfaces/use-cases/IAuthUseCases';

export class LogoutUseCase implements ILogoutUseCase {
  constructor(private readonly _userAuthRepository: IUserAuthRepository) {}

  async execute(userId: string): Promise<void> {
    await this._userAuthRepository.updateRefreshToken(userId, null);
  }
}
