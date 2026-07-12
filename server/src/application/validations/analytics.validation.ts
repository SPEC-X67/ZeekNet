import { z } from 'zod';
import { DashboardPeriod } from 'src/domain/enums/dashboard-period.enum';

export const GetAdminDashboardStatsQuerySchema = z.object({
  period: z.nativeEnum(DashboardPeriod).optional().default(DashboardPeriod.ALL),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
