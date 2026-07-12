import type { JobApplicationDetailResponseDto } from 'src/application/dtos/job-application.dto';
import { AddInterviewData } from 'src/domain/interfaces/use-cases/interview/AddInterviewData';

export interface IAddInterviewUseCase {
  execute(data: AddInterviewData): Promise<JobApplicationDetailResponseDto>;
}

