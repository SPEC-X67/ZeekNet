import { GetCompaniesQueryDto, PaginatedCompaniesResultDto } from 'src/application/dtos/admin/companies/company.dto';

export interface IGetAllCompaniesUseCase {
  execute(options: GetCompaniesQueryDto): Promise<PaginatedCompaniesResultDto>;
}

