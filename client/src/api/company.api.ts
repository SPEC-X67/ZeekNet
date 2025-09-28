import { baseApi, uploadFile } from './base.api';
import type { ApiEnvelope } from '@/interfaces/auth';
import type { JobPostingResponse, JobPostingQuery } from '@/types/job';

export interface CompanyProfileData {
  company_name: string
  email: string
  website?: string
  industry: string
  organisation: string
  location: string
  employees?: string
  description?: string
  logo?: string
  business_license?: string
  tax_id?: string
}

export interface CompanyProfileResponse {
  id: string
  company_name: string
  email: string
  website?: string
  industry: string
  organisation: string
  location: string
  employees?: string
  description?: string
  logo?: string
  business_license?: string
  tax_id?: string
  isVerified: string
  createdAt: string
  updatedAt: string
}

export interface JobPostingRequest {
  title: string
  description: string
  responsibilities: string[]
  qualifications: string[]
  nice_to_haves?: string[]
  benefits?: string[]
  salary: {
    min: number
    max: number
  }
  employment_types: ("full-time" | "part-time" | "contract" | "internship" | "remote")[]
  location: string
  skills_required?: string[]
  category_ids: string[]
}


interface CompanyDashboard {
  totalJobs: number;
  activeJobs: number;
  pendingJobs: number;
  totalApplications: number;
  recentApplications: unknown[];
  profileCompletion: number;
  profileStatus: string;
}

export const companyApi = {
  async createProfile(data: CompanyProfileData): Promise<ApiEnvelope<CompanyProfileResponse>> {
    return baseApi.post<CompanyProfileResponse>('/api/company/profile')(data);
  },

  async updateProfile(data: Partial<CompanyProfileData>): Promise<ApiEnvelope<CompanyProfileResponse>> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value && key !== 'logo' && key !== 'business_license') {
        formData.append(key, value);
      }
    });

    return baseApi.put<CompanyProfileResponse>('/api/company/profile')(formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async reapplyVerification(data: CompanyProfileData): Promise<ApiEnvelope<CompanyProfileResponse>> {
    return baseApi.post<CompanyProfileResponse>('/api/company/reapply-verification')(data);
  },

  async uploadLogo(file: File): Promise<ApiEnvelope<{ url: string; filename: string }>> {
    return uploadFile<{ url: string; filename: string }>('/api/company/upload/logo', file, 'logo');
  },

  async uploadBusinessLicense(file: File): Promise<ApiEnvelope<{ url: string; filename: string }>> {
    return uploadFile<{ url: string; filename: string }>('/api/company/upload/business-license', file, 'business_license');
  },

  async deleteImage(imageUrl: string): Promise<ApiEnvelope<{ message: string }>> {
    return baseApi.delete<{ message: string }>('/api/company/upload/delete')({ imageUrl });
  },

  async getProfile(): Promise<ApiEnvelope<CompanyProfileResponse>> {
    return baseApi.get<CompanyProfileResponse>('/api/company/profile')();
  },

  async getProfileById(profileId: string): Promise<ApiEnvelope<CompanyProfileResponse>> {
    return baseApi.get<CompanyProfileResponse>(`/api/company/profile/${profileId}`)();
  },

  async getDashboard(): Promise<ApiEnvelope<CompanyDashboard>> {
    return baseApi.get<CompanyDashboard>('/api/company/dashboard')();
  },

  async createJobPosting(data: JobPostingRequest): Promise<ApiEnvelope<JobPostingResponse>> {
    return baseApi.post<JobPostingResponse>('/api/company/jobs')(data);
  },

  async getJobPostings(query?: JobPostingQuery): Promise<ApiEnvelope<{ jobs: JobPostingResponse[], total: number, page: number, limit: number }>> {
    const queryString = query ? new URLSearchParams(
      Object.entries(query).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            acc[key] = value.join(',');
          } else {
            acc[key] = value.toString();
          }
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    
    const endpoint = queryString ? `/api/company/jobs?${queryString}` : '/api/company/jobs';
    return baseApi.get<{ jobs: JobPostingResponse[], total: number, page: number, limit: number }>(endpoint)();
  },

  async getJobPosting(id: string): Promise<ApiEnvelope<JobPostingResponse>> {
    return baseApi.get<JobPostingResponse>(`/api/company/jobs/${id}`)();
  },

  async updateJobPosting(id: string, data: Partial<JobPostingRequest>): Promise<ApiEnvelope<JobPostingResponse>> {
    return baseApi.put<JobPostingResponse>(`/api/company/jobs/${id}`)(data);
  },

  async deleteJobPosting(id: string): Promise<ApiEnvelope<{ message: string }>> {
    return baseApi.delete<{ message: string }>(`/api/company/jobs/${id}`)();
  },

  async updateJobStatus(id: string, is_active: boolean): Promise<ApiEnvelope<JobPostingResponse>> {
    return baseApi.patch<JobPostingResponse>(`/api/company/jobs/${id}/status`)({ is_active });
  }
}
