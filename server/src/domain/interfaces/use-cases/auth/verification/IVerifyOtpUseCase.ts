import { LoginResponseDto } from 'src/application/dtos/auth.dto';
import { VerifyOtpRequestDto } from 'src/application/dtos/auth.dto';

export interface IVerifyOtpUseCase {
  execute(params: VerifyOtpRequestDto): Promise<LoginResponseDto>;
}
