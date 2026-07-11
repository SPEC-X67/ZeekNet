import { AdminDashboardStatsResponseDto, GetAdminDashboardStatsQueryDto } from 'src/application/dtos/admin/analytics/analytics.dto';

export interface IGetAdminDashboardStatsUseCase {
  execute(query: GetAdminDashboardStatsQueryDto): Promise<AdminDashboardStatsResponseDto>;
}