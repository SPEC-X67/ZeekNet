import { JobApplicationResponseDto, MoveApplicationStageDto } from 'src/application/dtos/job-application.dto';

export interface IMoveApplicationStageUseCase {
  execute(dto: MoveApplicationStageDto): Promise<JobApplicationResponseDto>;
}

