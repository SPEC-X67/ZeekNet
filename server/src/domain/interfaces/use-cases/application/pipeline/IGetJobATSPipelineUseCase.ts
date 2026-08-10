import { JobATSPipelineResponseDto } from 'src/application/dtos/job-application.dto';
import { GetJobPipelineDto } from 'src/application/dtos/job-application.dto';

export interface IGetJobATSPipelineUseCase {
  execute(dto: GetJobPipelineDto): Promise<JobATSPipelineResponseDto>;
}

