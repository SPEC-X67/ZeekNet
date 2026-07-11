import { AdminJobListResponseDto, JobPostingFilters } from 'src/application/dtos/admin/job.dto';

export interface IAdminGetAllJobsUseCase {
  execute(query: JobPostingFilters): Promise<AdminJobListResponseDto>;
}

