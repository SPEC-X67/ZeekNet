import { AdminJobListResponseDto } from 'src/application/dtos/job-posting.dto';
import { JobPostingFilters } from 'src/application/dtos/public.dto';

export interface IAdminGetAllJobsUseCase {
  execute(query: JobPostingFilters): Promise<AdminJobListResponseDto>;
}

