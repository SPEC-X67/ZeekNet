import { JobPostingResponseDto } from 'src/application/dtos/admin/job/job.dto';

export interface IAdminGetJobByIdUseCase {
  execute(jobId: string): Promise<JobPostingResponseDto>;
}
