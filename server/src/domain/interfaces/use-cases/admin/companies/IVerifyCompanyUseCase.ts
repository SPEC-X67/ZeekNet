import { VerifyCompanyRequestDto } from 'src/application/dtos/admin/company.dto';

export interface IVerifyCompanyUseCase {
  execute(dto: VerifyCompanyRequestDto): Promise<void>;
}
