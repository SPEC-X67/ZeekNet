import { IUserManagementRepository } from '../../../domain/interfaces/repositories';

export class BlockUserUseCase {
  constructor(
    private readonly _userRepository: IUserManagementRepository,
  ) {}

  async execute(userId: string, isBlocked: boolean): Promise<void> {
    await this._userRepository.updateUserBlockStatus(userId, isBlocked);
  }
}
