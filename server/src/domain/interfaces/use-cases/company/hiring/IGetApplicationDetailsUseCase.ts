import { GetApplicationDetailsRequestDto } from 'src/application/dtos/company-hiring.dto';
import type { JobApplicationDetailResponseDto } from 'src/application/dtos/job-application.dto';

export interface IGetApplicationDetailsUseCase {
  execute(data: GetApplicationDetailsRequestDto): Promise<JobApplicationDetailResponseDto>;
}

