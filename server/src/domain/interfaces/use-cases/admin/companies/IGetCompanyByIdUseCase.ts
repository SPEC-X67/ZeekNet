import { CompanyWithVerificationResult } from 'src/application/dtos/admin/company.dto';

export interface IGetCompanyByIdUseCase {
  execute(companyId: string): Promise<CompanyWithVerificationResult>;
}

