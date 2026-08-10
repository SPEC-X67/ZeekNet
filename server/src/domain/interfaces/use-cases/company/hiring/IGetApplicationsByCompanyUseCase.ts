import { ApplicationFiltersRequestDto } from 'src/application/dtos/company-hiring.dto';
import type { PaginatedApplicationsResponseDto } from 'src/application/dtos/job-application.dto';

export interface IGetApplicationsByCompanyUseCase {
  execute(data: ApplicationFiltersRequestDto): Promise<PaginatedApplicationsResponseDto>;
}

