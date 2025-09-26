import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepository } from '../../../domain/repositories';
import { PasswordResetService } from '../../interfaces/infrastructure';
import { NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.PasswordResetService)
    private readonly passwordResetService: PasswordResetService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Email not found');
    }
    const token = await this.passwordResetService.generateResetToken(user.id, user.email);
    await this.passwordResetService.sendResetEmail(user.email, token);
  }
}
