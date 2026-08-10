import { GetCompaniesQueryDto, PaginatedCompaniesResultDto } from 'src/application/dtos/company-verification.dto';

export interface IGetAllCompaniesUseCase {
  execute(options: GetCompaniesQueryDto): Promise<PaginatedCompaniesResultDto>;
}

