import { IPasswordHasher, IPasswordResetService } from '../../../domain/interfaces/services';
import { IUserRepositoryFull } from '../../../domain/interfaces/repositories';
import { ValidationError } from '../../../domain/errors/errors';

export class ResetPasswordUseCase {
  constructor(
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _passwordResetService: IPasswordResetService,
    private readonly _userRepository: IUserRepositoryFull,
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    const resetData = await this._passwordResetService.getResetToken(token);
    if (!resetData) {
      throw new ValidationError('Invalid or expired reset token');
    }
    const hashedPassword = await this._passwordHasher.hash(newPassword);
    await this._userRepository.updatePassword(resetData.userId, hashedPassword);
    await this._passwordResetService.invalidateToken(token);
  }
}
