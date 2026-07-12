import { VerifyCompanyRequestDto } from 'src/application/dtos/company-verification.dto';

export interface IVerifyCompanyUseCase {
  execute(dto: VerifyCompanyRequestDto): Promise<void>;
}
