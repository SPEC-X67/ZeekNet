import { JobPostingResponseDto } from 'src/application/dtos/public.dto';

export interface IAdminGetJobByIdUseCase {
  execute(jobId: string): Promise<JobPostingResponseDto>;
}
