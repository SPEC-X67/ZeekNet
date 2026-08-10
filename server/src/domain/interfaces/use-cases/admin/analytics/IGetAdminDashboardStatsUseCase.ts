import { GetAdminDashboardStatsQueryDto } from 'src/application/dtos/analytics.dto';
import { AdminDashboardStatsResponseDto } from 'src/application/dtos/analytics.dto';

export interface IGetAdminDashboardStatsUseCase {
  execute(query: GetAdminDashboardStatsQueryDto): Promise<AdminDashboardStatsResponseDto>;
}