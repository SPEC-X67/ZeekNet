import { JobPostingResponseDto } from 'src/application/dtos/admin/job.dto';
import { UpdateJobStatusDto } from 'src/application/dtos/job/job.dto';;

export interface IUpdateJobStatusUseCase {
  execute(dto: UpdateJobStatusDto): Promise<JobPostingResponseDto>;
}

