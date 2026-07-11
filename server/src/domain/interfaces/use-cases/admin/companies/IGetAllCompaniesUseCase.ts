import { GetCompaniesQueryDto, PaginatedCompaniesResultDto } from 'src/application/dtos/admin/company.dto';

export interface IGetAllCompaniesUseCase {
  execute(options: GetCompaniesQueryDto): Promise<PaginatedCompaniesResultDto>;
}

