import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull } from '../../../domain/repositories';

@injectable()
export class BlockUserUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
  ) {}

  async execute(userId: string, isBlocked: boolean): Promise<void> {
    await this.userRepository.updateUserBlockStatus(userId, isBlocked);
  }
}
