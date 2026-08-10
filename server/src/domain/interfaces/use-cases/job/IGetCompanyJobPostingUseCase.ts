import { JobPostingResponseDto } from 'src/application/dtos/public.dto';
import { GetCompanyJobPostingDto } from 'src/application/dtos/job-posting.dto';

export interface IGetCompanyJobPostingUseCase {
  execute(dto: GetCompanyJobPostingDto): Promise<JobPostingResponseDto>;
}
