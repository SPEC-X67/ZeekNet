import type { JobApplicationListResponseDto } from 'src/application/dtos/job-application.dto';
import { UpdateApplicationScoreDto } from 'src/application/dtos/company-hiring.dto';

export interface IUpdateApplicationScoreUseCase {
  execute(dto: UpdateApplicationScoreDto): Promise<JobApplicationListResponseDto>;
}

