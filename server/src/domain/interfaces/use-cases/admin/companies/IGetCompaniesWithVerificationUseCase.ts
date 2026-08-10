import { GetCompaniesQueryDto, PaginatedCompaniesWithVerificationResultDto } from 'src/application/dtos/company-verification.dto';

export interface IGetCompaniesWithVerificationUseCase {
  execute(options: GetCompaniesQueryDto): Promise<PaginatedCompaniesWithVerificationResultDto>;
}

