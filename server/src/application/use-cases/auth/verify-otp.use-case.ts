import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { OtpService } from '../../interfaces/infrastructure';
import { IUserRepositoryFull } from '../../../domain/repositories';
import { ValidationError, NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class VerifyOtpUseCase {
  constructor(
    @inject(TYPES.OtpService)
    private readonly otpService: OtpService,
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
  ) {}

  async execute(email: string, code: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isValid = await this.otpService.verifyOtp(email, code);
    if (!isValid) {
      throw new ValidationError('Invalid or expired OTP code');
    }
    await this.userRepository.updateVerificationStatus(email, true);
  }
}
