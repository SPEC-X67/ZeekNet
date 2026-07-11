import { JobPostingResponseDto } from 'src/application/dtos/admin/job/job.dto';

export interface IGetJobPostingUseCase {
  execute(jobId: string): Promise<JobPostingResponseDto>;
}
