import { JobPostingResponseDto } from 'src/application/dtos/admin/job.dto';

export interface IAdminGetJobByIdUseCase {
  execute(jobId: string): Promise<JobPostingResponseDto>;
}
