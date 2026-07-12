import { JobPostingResponseDto } from 'src/application/dtos/public.dto';
import { UpdateCompanyJobPostingDto } from 'src/application/dtos/job-posting.dto';

export interface IUpdateJobPostingUseCase {
  execute(dto: UpdateCompanyJobPostingDto): Promise<JobPostingResponseDto>;
}

