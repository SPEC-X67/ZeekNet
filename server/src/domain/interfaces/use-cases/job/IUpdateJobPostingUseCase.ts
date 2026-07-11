import { JobPostingResponseDto } from 'src/application/dtos/admin/job/job.dto';
import { UpdateCompanyJobPostingDto } from 'src/application/dtos/company/job/requests/update-company-job-posting.dto';

export interface IUpdateJobPostingUseCase {
  execute(dto: UpdateCompanyJobPostingDto): Promise<JobPostingResponseDto>;
}

