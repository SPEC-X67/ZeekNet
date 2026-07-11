import { GetCompaniesQueryDto, PaginatedCompaniesWithVerificationResultDto } from 'src/application/dtos/admin/companies/company.dto';

export interface IGetCompaniesWithVerificationUseCase {
  execute(options: GetCompaniesQueryDto): Promise<PaginatedCompaniesWithVerificationResultDto>;
}

