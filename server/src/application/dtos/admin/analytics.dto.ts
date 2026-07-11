import { z } from 'zod';

// requests/get-admin-dashboard-stats-query.dto.ts
export const GetAdminDashboardStatsQueryDto = z.object({
  period: z.enum(['all', 'day', 'week', 'month', 'year']).optional().default('all'),
  startDate: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
  endDate: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.startDate <= data.endDate;
    }
    return true;
  },
  {
    message: 'startDate must be before or equal to endDate',
  },
);
export type GetAdminDashboardStatsQueryDto = z.infer<typeof GetAdminDashboardStatsQueryDto>;

// responses/admin-dashboard-stats-response.dto.ts
export class AdminDashboardStatsResponseDto {
  stats!: {
    earnings: number;
    totalCandidates: number;
    totalCompanies: number;
    totalVerifiedUsers: number;
    activeJobs: number;
    unlistedJobs: number;
    blockedJobs: number;
    closedJobs: number;
    expiredJobs: number;
    pendingCompanies: number;
    allJobs: number;
  };
  charts!: {
    earningsOverview: { label: string; value: number }[];
  };
  pendingCompanies!: {
    id: string;
    companyName: string;
    logo: string;
    industry: string;
  }[];
  recentJobs!: {
    id: string;
    title: string;
    experience: string;
    jobType: string;
    companyName: string;
    postedAt: Date;
  }[];
  recentOrders!: {
    orderNo: string;
    amount: number;
    planName: string;
    paymentProvider: string;
    paymentStatus: string;
    createdTime: Date;
  }[];
}
