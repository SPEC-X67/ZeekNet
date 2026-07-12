import { JobPostingResponseDto } from 'src/application/dtos/public.dto';
import { UpdateJobStatusRequestDto } from 'src/application/dtos/job-posting.dto';

export interface IAdminUpdateJobStatusUseCase {
  execute(jobId: string, dto: UpdateJobStatusRequestDto): Promise<JobPostingResponseDto>;
}
