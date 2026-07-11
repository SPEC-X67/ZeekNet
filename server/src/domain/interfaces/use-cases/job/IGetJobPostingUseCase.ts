import { JobPostingResponseDto } from 'src/application/dtos/admin/job.dto';

export interface IGetJobPostingUseCase {
  execute(jobId: string): Promise<JobPostingResponseDto>;
}
