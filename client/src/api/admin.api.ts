import { api } from './index';
import type { JobPostingResponse, JobPostingQuery, PaginatedJobPostings } from '@/types/job';

export const adminApi = {
  getAllJobs: async (query: JobPostingQuery & {
      status?: 'all' | 'active' | 'inactive';
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    } = {}): Promise<{
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
        if (query.is_active !== undefined) params.append('is_active', query.is_active.toString());
        if (query.status && query.status !== 'all') {
          params.append('is_active', query.status === 'active' ? 'true' : 'false');
        }
        if (query.sortBy) params.append('sortBy', query.sortBy);
        if (query.sortOrder) params.append('sortOrder', query.sortOrder);

        const response = await api.get(`/api/admin/jobs?${params.toString()}`);
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
        const response = await api.get(`/api/admin/jobs/${id}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch job',
        };
      }
    },

  updateJobStatus: async (jobId: string, isActive: boolean, unpublishReason?: string): Promise<{
      success: boolean;
      message?: string;
    }> => {
      try {
        const response = await api.patch(`/api/admin/jobs/${jobId}/status`, {
          is_active: isActive,
          unpublish_reason: unpublishReason
        });
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to update job status',
        };
      }
    },

  deleteJob: async (jobId: string): Promise<{
      success: boolean;
      message?: string;
    }> => {
      try {
        const response = await api.delete(`/api/admin/jobs/${jobId}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to delete job',
        };
      }
    },

  getJobStats: async (): Promise<{
      success: boolean;
      data?: {
        total: number;
        active: number;
        inactive: number;
        totalApplications: number;
        totalViews: number;
      };
      message?: string;
    }> => {
      try {
        const response = await api.get('/api/admin/jobs/stats');
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch job statistics',
        };
      }
    },

  getAllUsers: async (query: GetAllUsersParams = {} as GetAllUsersParams): Promise<{
      success: boolean;
      data?: {
        users: any[];
        total: number;      
        page: number;       
        limit: number;
        totalPages: number;
      };
      message?: string;
    }> => {
      try {
        const params = new URLSearchParams();
        
        if (query.page) params.append('page', query.page.toString());
        if (query.limit) params.append('limit', query.limit.toString());
        if (query.search) params.append('search', query.search);
        if (query.role) params.append('role', query.role);
        if (query.isBlocked !== undefined) {
          const blocked = typeof query.isBlocked === 'string' ? query.isBlocked : query.isBlocked.toString();
          params.append('isBlocked', blocked);
        }

        const response = await api.get(`/api/admin/users?${params.toString()}`);
        return response.data;
      } catch (error: any) {
        console.error('API Error:', error.response || error); 
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch users',
        };
      }
    },

  getUserById: async (userId: string): Promise<{
      success: boolean;
      data?: any;
      message?: string;
    }> => {
      try {
        const response = await api.get(`/api/admin/users/${userId}`);
        return response.data;
    } catch (error: any) {
      return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch user',
        };
      }
    },

  blockUser: async (userId: string, isBlocked: boolean): Promise<{
      success: boolean;
      message?: string;
    }> => {
      try {
        const response = await api.patch('/api/admin/users/block', {
          userId,
          isBlocked
        });
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to update user status',
        };
      }
    },

  getAllCompanies: async (query: GetAllCompaniesParams ): Promise<{
      success: boolean;
      data?: {
        companies: Company[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
      message?: string;
    }> => {
      try {
        const params = new URLSearchParams();

        if (query.page) params.append('page', query.page.toString());
        if (query.limit) params.append('limit', query.limit.toString());
        if (query.search) params.append('search', query.search);
        if (query.industry) params.append('industry', query.industry);
        if (query.isVerified) params.append('isVerified', query.isVerified);
        if (query.isBlocked !== undefined) params.append('isBlocked', query.isBlocked.toString());

        const response = await api.get(`/api/admin/companies?${params.toString()}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch companies',
        };
      }
    },

  getPendingCompanies: async (): Promise<{
      success: boolean;
      data?: {
        companies: Company[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      message?: string;
    }> => {
      try {
        const response = await api.get('/api/admin/companies/verification');
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch pending companies',
        };
      }
    },

  getCompanyById: async (companyId: string): Promise<{
      success: boolean;
      data?: any;
      message?: string;
    }> => {
      try {
        const response = await api.get(`/api/admin/companies/${companyId}`);
        return response.data;
    } catch (error: any) {
      return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch company',
        };
      }
    },

  verifyCompany: async (data: { companyId: string; isVerified: string; rejection_reason?: string }): Promise<{
      success: boolean;
      message?: string;
    }> => {
      try {
        const response = await api.patch('/api/admin/companies/verify', data);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to verify company',
        };
      }
    },

  blockCompany: async (data: { companyId: string; isBlocked: boolean }): Promise<{
      success: boolean;
      message?: string;
    }> => {
      try {
        const response = await api.patch('/api/admin/companies/block', data);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to update company status',
        };
      }
    },

  getAllSkills: async (params: GetAllSkillsParams = {}): Promise<{
      success: boolean;
      data?: {
        skills: Skill[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      message?: string;
    }> => {
      try {
        const queryParams = new URLSearchParams();
        
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const response = await api.get(`/api/admin/skills?${queryParams.toString()}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch skills',
        };
      }
    },

  createSkill: async (data: { name: string }): Promise<{
      success: boolean;
      data?: Skill;
      message?: string;
    }> => {
      try {
        const response = await api.post('/api/admin/skills', data);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to create skill',
        };
      }
    },

  updateSkill: async (id: string, data: { name: string }): Promise<{
      success: boolean;
      data?: Skill;
      message?: string;
    }> => {
      try {
        const response = await api.put(`/api/admin/skills/${id}`, data);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to update skill',
        };
      }
    },

  deleteSkill: async (id: string): Promise<{
      success: boolean;
      message?: string;
    }> => {
      try {
        const response = await api.delete(`/api/admin/skills/${id}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to delete skill',
        };
      }
    },

  getAllJobCategories: async (params: GetAllJobCategoriesParams = {}): Promise<{
      success: boolean;
      data?: {
        categories: JobCategory[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      message?: string;
    }> => {
      try {
        const queryParams = new URLSearchParams();
        
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);

        const response = await api.get(`/api/admin/job-categories?${queryParams.toString()}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch job categories',
        };
      }
    },

  createJobCategory: async (data: { name: string }): Promise<{
      success: boolean;
      data?: JobCategory;
      message?: string;
    }> => {
      try {
        const response = await api.post('/api/admin/job-categories', data);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to create job category',
        };
      }
    },

  updateJobCategory: async (id: string, data: { name: string }): Promise<{
      success: boolean;
      data?: JobCategory;
      message?: string;
    }> => {
      try {
        const response = await api.put(`/api/admin/job-categories/${id}`, data);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to update job category',
        };
      }
    },

  deleteJobCategory: async (id: string): Promise<{
      success: boolean;
      message?: string;
    }> => {
      try {
        const response = await api.delete(`/api/admin/job-categories/${id}`);
        return response.data;
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to delete job category',
        };
      }
    }
};

export interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  userId?: string;
  companyName: string;
  logo: string;
  banner: string;
  websiteLink: string;
  employeeCount: number;
  industry: string;
  organisation: string;
  aboutUs: string;
  isVerified: 'pending' | 'rejected' | 'verified';
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  verification?: {
    taxId: string;
    businessLicenseUrl: string;
  } | null;
}

export interface GetAllUsersParams {
  page: number;
  limit: number;
  search?: string;
  role?: string;
  isBlocked?: boolean | string;
}

export interface GetAllCompaniesParams {
  page: number;
  limit: number;
  search?: string;
  industry?: string;
  isVerified?: 'pending' | 'rejected' | 'verified';
  isBlocked?: boolean | string;
}

export interface JobCategory {
  id: string;
  name: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllSkillsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetAllJobCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}