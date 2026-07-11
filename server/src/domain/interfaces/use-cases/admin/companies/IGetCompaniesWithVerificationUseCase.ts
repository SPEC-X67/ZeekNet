import { GetCompaniesQueryDto, PaginatedCompaniesWithVerificationResultDto } from 'src/application/dtos/admin/company.dto';

export interface IGetCompaniesWithVerificationUseCase {
  execute(options: GetCompaniesQueryDto): Promise<PaginatedCompaniesWithVerificationResultDto>;
}

