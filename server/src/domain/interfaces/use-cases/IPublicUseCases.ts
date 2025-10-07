import { PaginatedJobPostings, JobPostingFilters } from '../../entities/job-posting.entity';
import { JobPostingDetailResponseDto } from '../../../application/mappers/types';

export interface IGetAllJobPostingsUseCase {
  execute(query: JobPostingFilters): Promise<PaginatedJobPostings>;
}

export interface IGetJobPostingForPublicUseCase {
  execute(jobId: string): Promise<JobPostingDetailResponseDto>;
}
