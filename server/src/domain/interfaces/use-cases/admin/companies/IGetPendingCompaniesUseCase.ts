import { PaginatedCompaniesWithVerificationResultDto } from 'src/application/dtos/company-verification.dto';

export interface IGetPendingCompaniesUseCase {
  execute(): Promise<PaginatedCompaniesWithVerificationResultDto>;
}

