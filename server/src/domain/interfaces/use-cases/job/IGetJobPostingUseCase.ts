import { JobPostingResponseDto } from 'src/application/dtos/public.dto';

export interface IGetJobPostingUseCase {
  execute(jobId: string): Promise<JobPostingResponseDto>;
}
