import { PaginatedCompaniesWithVerificationResultDto } from 'src/application/dtos/admin/company.dto';


export interface IGetPendingCompaniesUseCase {
  execute(): Promise<PaginatedCompaniesWithVerificationResultDto>;
}

