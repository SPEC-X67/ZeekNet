import { JobPostingResponseDto } from 'src/application/dtos/admin/job/job.dto';
import { UpdateJobStatusDto } from 'src/application/dtos/job/requests/update-job-status.dto';

export interface IUpdateJobStatusUseCase {
  execute(dto: UpdateJobStatusDto): Promise<JobPostingResponseDto>;
}

