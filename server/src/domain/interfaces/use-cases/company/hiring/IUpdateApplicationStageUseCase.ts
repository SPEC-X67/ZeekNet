import type { JobApplicationListResponseDto } from 'src/application/dtos/job-application.dto';
import { UpdateApplicationStageDto } from 'src/application/dtos/job-application.dto';

export interface IUpdateApplicationStageUseCase {
  execute(dto: UpdateApplicationStageDto): Promise<JobApplicationListResponseDto>;
}

