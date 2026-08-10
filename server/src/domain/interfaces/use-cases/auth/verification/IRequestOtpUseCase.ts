import { RequestOtpRequestDto } from 'src/application/dtos/auth.dto';

export interface IRequestOtpUseCase {
    execute(params: RequestOtpRequestDto): Promise<void>;
}