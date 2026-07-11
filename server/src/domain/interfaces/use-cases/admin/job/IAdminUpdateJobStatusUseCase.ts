import { JobPostingResponseDto, UpdateJobStatusRequestDto } from 'src/application/dtos/admin/job/job.dto';

export interface IAdminUpdateJobStatusUseCase {
  execute(jobId: string, dto: UpdateJobStatusRequestDto): Promise<JobPostingResponseDto>;
}
