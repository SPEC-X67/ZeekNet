import { AdminDashboardStatsResponseDto, GetAdminDashboardStatsQueryDto } from 'src/application/dtos/admin/analytics.dto';

export interface IGetAdminDashboardStatsUseCase {
  execute(query: GetAdminDashboardStatsQueryDto): Promise<AdminDashboardStatsResponseDto>;
}