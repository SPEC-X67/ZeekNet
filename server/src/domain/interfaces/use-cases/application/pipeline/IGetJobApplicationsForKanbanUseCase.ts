import { JobApplicationsKanbanResponseDto } from 'src/application/dtos/job-application.dto';
import { GetJobApplicationsKanbanDto } from 'src/application/dtos/job-application.dto';

export interface IGetJobApplicationsForKanbanUseCase {
  execute(dto: GetJobApplicationsKanbanDto): Promise<JobApplicationsKanbanResponseDto>;
}

