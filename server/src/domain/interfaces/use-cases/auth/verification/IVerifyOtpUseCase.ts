import { LoginResponseDto } from 'src/application/dtos/auth/login.dto';
import { VerifyOtpRequestDto } from 'src/application/dtos/auth/otp.dto';

export interface IVerifyOtpUseCase {
  execute(params: VerifyOtpRequestDto): Promise<LoginResponseDto>;
}
