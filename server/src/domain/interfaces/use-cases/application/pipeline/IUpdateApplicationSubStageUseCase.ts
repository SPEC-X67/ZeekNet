import { JobApplicationResponseDto, UpdateSubStageDto } from 'src/application/dtos/job-application.dto';

export interface IUpdateApplicationSubStageUseCase {
  execute(dto: UpdateSubStageDto): Promise<JobApplicationResponseDto>;
}

