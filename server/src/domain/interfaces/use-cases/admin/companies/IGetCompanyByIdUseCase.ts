import { CompanyWithVerificationResult } from 'src/application/dtos/admin/companies/company.dto';


export interface IGetCompanyByIdUseCase {
  execute(companyId: string): Promise<CompanyWithVerificationResult>;
}

