import { JobApplicationResponseDto, MoveApplicationStageDto } from 'src/application/dtos/application/application.dto';

export interface IMoveApplicationStageUseCase {
  execute(dto: MoveApplicationStageDto): Promise<JobApplicationResponseDto>;
}

