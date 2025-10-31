import { IUserManagementRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';

export class BlockUserUseCase {
  constructor(private readonly _userRepository: IUserManagementRepository) {}

  async execute(userId: string, isBlocked: boolean): Promise<void> {
    await this._userRepository.updateUserBlockStatus(userId, isBlocked);
  }
}