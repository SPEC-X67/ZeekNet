import { PaginatedJobPostings, JobPostingFilters } from '../../entities/job-posting.entity';
import { JobPostingDetailResponseDto } from '../../../application/dto/job-posting/job-posting-response.dto';

export interface IGetAllJobPostingsUseCase {
  execute(query: JobPostingFilters): Promise<PaginatedJobPostings>;
}

export interface IGetJobPostingForPublicUseCase {
  execute(jobId: string): Promise<JobPostingDetailResponseDto>;
}