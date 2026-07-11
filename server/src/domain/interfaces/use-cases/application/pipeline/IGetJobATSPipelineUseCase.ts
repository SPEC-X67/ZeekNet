import { JobATSPipelineResponseDto } from 'src/application/dtos/application/pipeline.dto';
import { GetJobPipelineDto } from 'src/application/dtos/application/application.dto';

export interface IGetJobATSPipelineUseCase {
  execute(dto: GetJobPipelineDto): Promise<JobATSPipelineResponseDto>;
}

