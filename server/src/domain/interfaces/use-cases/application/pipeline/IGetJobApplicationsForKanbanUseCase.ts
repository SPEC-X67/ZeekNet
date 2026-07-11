import { JobApplicationsKanbanResponseDto } from 'src/application/dtos/application/pipeline.dto';
import { GetJobApplicationsKanbanDto } from 'src/application/dtos/application/application.dto';

export interface IGetJobApplicationsForKanbanUseCase {
  execute(dto: GetJobApplicationsKanbanDto): Promise<JobApplicationsKanbanResponseDto>;
}

