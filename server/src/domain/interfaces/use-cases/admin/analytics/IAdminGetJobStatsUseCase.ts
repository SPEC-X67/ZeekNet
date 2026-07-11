import { AdminJobStatsResponseDto } from 'src/application/dtos/admin/job.dto';

export interface IAdminGetJobStatsUseCase {
  execute(): Promise<AdminJobStatsResponseDto>;
}

