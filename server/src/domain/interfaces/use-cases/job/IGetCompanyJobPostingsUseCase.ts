import { GetCompanyJobPostingsResponseDto } from 'src/application/dtos/job-posting.dto';
import { JobPostingQueryRequestDto } from 'src/application/dtos/job-posting.dto';

export interface IGetCompanyJobPostingsUseCase {
  execute(data: JobPostingQueryRequestDto): Promise<GetCompanyJobPostingsResponseDto>;
}

