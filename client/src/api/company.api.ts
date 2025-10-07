import { baseApi, uploadFile } from './base.api';
import type { ApiEnvelope } from '@/interfaces/auth';
import type { JobPostingResponse, JobPostingQuery } from '@/types/job';

export interface CompanyProfileData {
  company_name?: string
  website_link?: string
  website?: string
  industry?: string
  organisation?: string
  employee_count?: number
  employees?: string
  about_us?: string
  description?: string
  location?: string
  phone?: string
  foundedDate?: string
  logo?: string
  banner?: string
  business_license?: string
  tax_id?: string
  email?: string
}

export interface CompanyProfileResponse {
  id: string
  company_name: string
  logo: string
  banner: string
  website_link: string
  website?: string
  employee_count: number
  employees?: string
  industry: string
  organisation: string
  about_us: string
  description?: string
  location?: string
  phone?: string
  foundedDate?: string
  business_license?: string
  tax_id?: string
  email?: string
  is_verified: 'pending' | 'rejected' | 'verified'
  isVerified?: 'pending' | 'rejected' | 'verified'
  is_blocked: boolean
  created_at: string
  updated_at: string
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
  verificationStatus?: string;
}

export const companyApi = {
  async createProfile(data: CompanyProfileData): Promise<ApiEnvelope<CompanyProfileResponse>> {
    return baseApi.post<CompanyProfileResponse>('/api/company/profile')(data);
  },

  async updateProfile(data: Partial<CompanyProfileData>): Promise<ApiEnvelope<CompanyProfileResponse>> {
    if (!data.logo && !data.business_license) {
      return baseApi.put<CompanyProfileResponse>('/api/company/profile')(data);
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'logo' && key !== 'business_license') {
        formData.append(key, String(value));
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

  async getCompleteProfile(): Promise<ApiEnvelope<{
    profile: CompanyProfileResponse;
    contact: any | null;
    locations: any[];
    techStack: any[];
    benefits: any[];
    workplacePictures: any[];
    jobPostings: any[];
  }>> {
    return baseApi.get<{
      profile: CompanyProfileResponse;
      contact: any | null;
      locations: any[];
      techStack: any[];
      benefits: any[];
      workplacePictures: any[];
      jobPostings: any[];
    }>('/api/company/profile')();
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
    const params = new URLSearchParams();
    
    if (query) {
      if (query.page !== undefined) params.append('page', query.page.toString());
      if (query.limit !== undefined) params.append('limit', query.limit.toString());
      if (query.category_ids?.length) params.append('category_ids', query.category_ids.join(','));
      if (query.employment_types?.length) params.append('employment_types', query.employment_types.join(','));
      if (query.salary_min !== undefined) params.append('salary_min', query.salary_min.toString());
      if (query.salary_max !== undefined) params.append('salary_max', query.salary_max.toString());
      if (query.location) params.append('location', query.location);
      if (query.search) params.append('search', query.search);
      if (query.is_active !== undefined) params.append('is_active', query.is_active.toString());
    }
    
    const endpoint = params.toString() ? `/api/company/jobs?${params.toString()}` : '/api/company/jobs';
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
  },

  async getContact(): Promise<ApiEnvelope<any>> {
    return baseApi.get<any>('/api/company/contact')();
  },

  async updateContact(data: any): Promise<ApiEnvelope<any>> {
    return baseApi.put<any>('/api/company/contact')(data);
  },

  async getTechStacks(): Promise<ApiEnvelope<any[]>> {
    return baseApi.get<any[]>('/api/company/tech-stacks')();
  },

  async createTechStack(data: any): Promise<ApiEnvelope<any>> {
    return baseApi.post<any>('/api/company/tech-stacks')(data);
  },

  async updateTechStack(id: string, data: any): Promise<ApiEnvelope<any>> {
    return baseApi.put<any>(`/api/company/tech-stacks/${id}`)(data);
  },

  async deleteTechStack(id: string): Promise<ApiEnvelope<any>> {
    return baseApi.delete<any>(`/api/company/tech-stacks/${id}`)();
  },

  async getOfficeLocations(): Promise<ApiEnvelope<any[]>> {
    return baseApi.get<any[]>('/api/company/office-locations')();
  },

  async createOfficeLocation(data: any): Promise<ApiEnvelope<any>> {
    return baseApi.post<any>('/api/company/office-locations')(data);
  },

  async updateOfficeLocation(id: string, data: any): Promise<ApiEnvelope<any>> {
    return baseApi.put<any>(`/api/company/office-locations/${id}`)(data);
  },

  async deleteOfficeLocation(id: string): Promise<ApiEnvelope<any>> {
    return baseApi.delete<any>(`/api/company/office-locations/${id}`)();
  },

  async getBenefits(): Promise<ApiEnvelope<any[]>> {
    return baseApi.get<any[]>('/api/company/benefits')();
  },

  async createBenefit(data: any): Promise<ApiEnvelope<any>> {
    return baseApi.post<any>('/api/company/benefits')(data);
  },

  async updateBenefit(id: string, data: any): Promise<ApiEnvelope<any>> {
    return baseApi.put<any>(`/api/company/benefits/${id}`)(data);
  },

  async deleteBenefit(id: string): Promise<ApiEnvelope<any>> {
    return baseApi.delete<any>(`/api/company/benefits/${id}`)();
  },

  async getWorkplacePictures(): Promise<ApiEnvelope<any[]>> {
    return baseApi.get<any[]>('/api/company/workplace-pictures')();
  },

  async createWorkplacePicture(data: any): Promise<ApiEnvelope<any>> {
    return baseApi.post<any>('/api/company/workplace-pictures')(data);
  },

  async updateWorkplacePicture(id: string, data: any): Promise<ApiEnvelope<any>> {
    return baseApi.put<any>(`/api/company/workplace-pictures/${id}`)(data);
  },

  async deleteWorkplacePicture(id: string): Promise<ApiEnvelope<any>> {
    return baseApi.delete<any>(`/api/company/workplace-pictures/${id}`)();
  },

  async uploadWorkplacePicture(file: File): Promise<ApiEnvelope<{ url: string; filename: string }>> {
    return uploadFile<{ url: string; filename: string }>('/api/company/workplace-pictures/upload', file, 'image');
  }
}
