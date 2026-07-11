import { VerifyCompanyRequestDto } from 'src/application/dtos/admin/companies/company.dto';

export interface IVerifyCompanyUseCase {
  execute(dto: VerifyCompanyRequestDto): Promise<void>;
}
