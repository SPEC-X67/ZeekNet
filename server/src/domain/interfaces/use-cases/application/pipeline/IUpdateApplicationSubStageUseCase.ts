import { JobApplicationResponseDto, UpdateSubStageDto } from 'src/application/dtos/application/application.dto';

export interface IUpdateApplicationSubStageUseCase {
  execute(dto: UpdateSubStageDto): Promise<JobApplicationResponseDto>;
}

