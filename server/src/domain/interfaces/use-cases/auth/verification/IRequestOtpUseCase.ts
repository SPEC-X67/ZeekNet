import { RequestOtpRequestDto } from 'src/application/dtos/auth/otp.dto';

export interface IRequestOtpUseCase {
    execute(params: RequestOtpRequestDto): Promise<void>;
}