import { JobPostingDetailResponseDto } from 'src/application/dtos/public.dto';

export interface IGetJobPostingForPublicUseCase {
  execute(jobId: string, userId?: string): Promise<JobPostingDetailResponseDto>;
}

