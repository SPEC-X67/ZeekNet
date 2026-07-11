import { AdminJobStatsResponseDto } from 'src/application/dtos/admin/job/job.dto';

export interface IAdminGetJobStatsUseCase {
  execute(): Promise<AdminJobStatsResponseDto>;
}

