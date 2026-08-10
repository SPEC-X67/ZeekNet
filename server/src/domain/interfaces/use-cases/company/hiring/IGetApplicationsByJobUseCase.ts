import { GetApplicationsByJobRequestDto } from 'src/application/dtos/company-hiring.dto';
import type { PaginatedApplicationsResponseDto } from 'src/application/dtos/job-application.dto';

export interface IGetApplicationsByJobUseCase {
  execute(data: GetApplicationsByJobRequestDto): Promise<PaginatedApplicationsResponseDto>;
}

