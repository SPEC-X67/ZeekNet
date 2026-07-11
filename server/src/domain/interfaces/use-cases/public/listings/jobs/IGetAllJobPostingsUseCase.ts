import { GetAllJobPostingsResponseDto } from 'src/application/dtos/public/listings/jobs/responses/public-job-postings-response.dto';
import { JobPostingFilters } from 'src/application/dtos/admin/job.dto';

export interface IGetAllJobPostingsUseCase {
  execute(query: JobPostingFilters): Promise<GetAllJobPostingsResponseDto>;
}

