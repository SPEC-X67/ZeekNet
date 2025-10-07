import { IOtpService } from '../../../domain/interfaces/services';
import { IUserRepositoryFull } from '../../../domain/interfaces/repositories';
import { ValidationError, NotFoundError } from '../../../domain/errors/errors';

export class VerifyOtpUseCase {
  constructor(
    private readonly _otpService: IOtpService,
    private readonly _userRepository: IUserRepositoryFull,
  ) {}

  async execute(email: string, code: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isValid = await this._otpService.verifyOtp(email, code);
    if (!isValid) {
      throw new ValidationError('Invalid or expired OTP code');
    }
    await this._userRepository.updateVerificationStatus(email, true);
  }
}
