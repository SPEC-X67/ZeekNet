import { PaginatedCompaniesWithVerificationResultDto } from 'src/application/dtos/admin/companies/company.dto';


export interface IGetPendingCompaniesUseCase {
  execute(): Promise<PaginatedCompaniesWithVerificationResultDto>;
}

