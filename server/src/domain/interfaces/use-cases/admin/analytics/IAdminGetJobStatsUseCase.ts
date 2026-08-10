import { AdminJobStatsResponseDto } from 'src/application/dtos/job-posting.dto';

export interface IAdminGetJobStatsUseCase {
  execute(): Promise<AdminJobStatsResponseDto>;
}

