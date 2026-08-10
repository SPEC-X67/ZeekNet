import type { JobApplicationDetailResponseDto } from 'src/application/dtos/job-application.dto';

export interface IGetSeekerApplicationDetailsUseCase {
  execute(userId: string, applicationId: string): Promise<JobApplicationDetailResponseDto>;
}

