import { CompanyWithVerificationResult } from 'src/application/dtos/company-verification.dto';

export interface IGetCompanyByIdUseCase {
  execute(companyId: string): Promise<CompanyWithVerificationResult>;
}

