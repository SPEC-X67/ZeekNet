import { JobPostingResponseDto } from 'src/application/dtos/public.dto';
import { CreateJobPostingRequestDto } from 'src/application/dtos/job-posting.dto';

export interface ICreateJobPostingUseCase {
  execute(data: CreateJobPostingRequestDto): Promise<JobPostingResponseDto>;
}

