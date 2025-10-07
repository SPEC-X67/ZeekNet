import { Result } from '../../../shared/base/result';
import { RegisterResult } from '../../dto/auth/auth-response.dto';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { IUserRepository } from '../../../domain/interfaces/repositories';
import { IPasswordHasher, IOtpService, IMailerService } from '../../../domain/interfaces/services';
import { IRegisterUserUseCase } from '../../../domain/interfaces/use-cases';
import { ValidationError } from '../../../domain/errors/errors';
import { otpVerificationTemplate } from '../../../infrastructure/messaging/templates/otp-verification.template';

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _otpService: IOtpService,
    private readonly _mailerService: IMailerService,
  ) {}

  async execute(
    email: string,
    password: string,
    role?: UserRole,
    name?: string,
  ): Promise<Result<RegisterResult, Error>> {
    try {
      const validationResult = this.validateInput(email, password, name);
      if (!validationResult.isValid) {
        return Result.failure(new ValidationError(validationResult.errors.join(', ')));
      }

      const existingUserResult = await Result.fromPromise(
        this._userRepository.findByEmail(email),
      );
      
      if (existingUserResult.isSuccess && existingUserResult.value) {
        return Result.failure(new ValidationError('Email already registered'));
      }

      const hashedPasswordResult = await Result.fromPromise(
        this._passwordHasher.hash(password),
      );
      
      if (hashedPasswordResult.isFailure()) {
        return Result.failure(new Error('Password hashing failed'));
      }

      const user = await this._userRepository.save({
        name: name ?? '',
        email,
        password: hashedPasswordResult.value!,
        role: role ?? UserRole.SEEKER,
        isVerified: false,
        isBlocked: false,
        refreshToken: null,
      });

      this.sendOtpEmail(user.email).catch(error => {
        // Silent fail for OTP email
      });

      return Result.success({ user });

    } catch (error) {
      return Result.failure(
        error instanceof Error ? error : new Error('Unexpected error occurred'),
      );
    }
  }

  private validateInput(email: string, password: string, name?: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!email || !this.isValidEmail(email)) {
      errors.push('Valid email address is required');
    }

    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (name && (name.trim().length < 2 || name.trim().length > 50)) {
      errors.push('Name must be between 2 and 50 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async sendOtpEmail(email: string): Promise<void> {
    try {
      const code = await this._otpService.generateAndStoreOtp(email);
      const htmlContent = otpVerificationTemplate.html(code);
      await this._mailerService.sendMail(email, otpVerificationTemplate.subject, htmlContent);
    } catch (error) {
      throw error;
    }
  }
}