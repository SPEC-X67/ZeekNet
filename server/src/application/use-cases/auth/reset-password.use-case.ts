import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { PasswordHasher, PasswordResetService } from '../../interfaces/infrastructure';
import { IUserRepositoryFull } from '../../../domain/repositories';
import { ValidationError } from '../../../domain/errors/errors';

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,
    @inject(TYPES.PasswordResetService)
    private readonly passwordResetService: PasswordResetService,
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    const resetData = await this.passwordResetService.getResetToken(token);
    if (!resetData) {
      throw new ValidationError('Invalid or expired reset token');
    }
    const hashedPassword = await this.passwordHasher.hash(newPassword);
    await this.userRepository.updatePassword(resetData.userId, hashedPassword);
    await this.passwordResetService.invalidateToken(token);
  }
}
