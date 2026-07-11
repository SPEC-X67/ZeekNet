import { JobPostingDetailResponseDto } from 'src/application/dtos/admin/job.dto';

export interface IGetJobPostingForPublicUseCase {
  execute(jobId: string, userId?: string): Promise<JobPostingDetailResponseDto>;
}

