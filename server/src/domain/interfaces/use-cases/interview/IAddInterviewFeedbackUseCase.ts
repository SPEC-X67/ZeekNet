import type { JobApplicationDetailResponseDto } from 'src/application/dtos/job-application.dto';
import { AddInterviewFeedbackData } from 'src/domain/interfaces/use-cases/interview/AddInterviewFeedbackData';

export interface IAddInterviewFeedbackUseCase {
  execute(data: AddInterviewFeedbackData): Promise<JobApplicationDetailResponseDto>;
}

