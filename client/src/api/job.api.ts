import { api } from './index';
import type { JobPostingResponse, JobPostingQuery, PaginatedJobPostings } from '@/types/job';

export const jobApi = {
  getAllJobs: async (query: JobPostingQuery = {}): Promise<{
    success: boolean;
    data?: PaginatedJobPostings;
    message?: string;
  }> => {
    try {
      const params = new URLSearchParams();
      
      if (query.page) params.append('page', query.page.toString());
      if (query.limit) params.append('limit', query.limit.toString());
      if (query.category_ids?.length) params.append('category_ids', query.category_ids.join(','));
      if (query.employment_types?.length) params.append('employment_types', query.employment_types.join(','));
      if (query.salary_min) params.append('salary_min', query.salary_min.toString());
      if (query.salary_max) params.append('salary_max', query.salary_max.toString());
      if (query.location) params.append('location', query.location);
      if (query.search) params.append('search', query.search);

      const response = await api.get(`/api/public/jobs?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch jobs',
      };
    }
  },

  getJobById: async (id: string): Promise<{
    success: boolean;
    data?: JobPostingResponse;
    message?: string;
  }> => {
    try {
      const response = await api.get(`/api/public/jobs/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch job',
      };
    }
  },
};
