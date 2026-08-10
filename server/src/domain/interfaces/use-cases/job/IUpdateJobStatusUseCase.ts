import { JobPostingResponseDto } from 'src/application/dtos/public.dto';
import { UpdateJobStatusDto } from 'src/application/dtos/job-posting.dto';;

export interface IUpdateJobStatusUseCase {
  execute(dto: UpdateJobStatusDto): Promise<JobPostingResponseDto>;
}

