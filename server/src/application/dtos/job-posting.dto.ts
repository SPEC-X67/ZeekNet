import { CreateJobPostingRequestSchema, GetJobPostingsQuerySchema, JobPostingQuerySchema, GetAllJobsQuerySchema, UpdateJobPostingRequestSchema, UpdateJobStatusRequestSchema, UpdateJobStatusSchema, IncrementJobViewCountSchema, CloseJobSchema, DeleteCompanyJobPostingSchema, GetCompanyJobPostingSchema, ReopenJobSchema, ReopenJobRequestSchema, UpdateCompanyJobPostingSchema, CompanyUpdateJobStatusSchema, JobPostingFiltersSchema } from 'src/application/validations/job-posting.validation';
import { z } from 'zod';
import { EmploymentType } from 'src/domain/enums/employment-type.enum';
import { JobStatus } from 'src/domain/enums/job-status.enum';

export type CreateJobPostingRequestDto = z.infer<typeof CreateJobPostingRequestSchema> & {
  userId?: string;
};
export type GetJobPostingsQueryDto = z.infer<typeof GetJobPostingsQuerySchema>;
export type JobPostingQueryRequestDto = GetJobPostingsQueryDto;
export type GetAllJobsQueryDtoType = z.infer<typeof GetAllJobsQuerySchema>;
export type UpdateJobPostingRequestDto = z.infer<typeof UpdateJobPostingRequestSchema>;
export type UpdateJobStatusRequestDto = z.infer<typeof UpdateJobStatusRequestSchema>;
export type UpdateJobStatusDto = z.infer<typeof UpdateJobStatusSchema>;
export type IncrementJobViewCountDto = z.infer<typeof IncrementJobViewCountSchema>;
export type CloseJobDto = z.infer<typeof CloseJobSchema>;
export type DeleteCompanyJobPostingDto = z.infer<typeof DeleteCompanyJobPostingSchema>;
export type GetCompanyJobPostingDto = z.infer<typeof GetCompanyJobPostingSchema>;
export type ReopenJobDto = z.infer<typeof ReopenJobSchema>;
export type ReopenJobRequestDto = z.infer<typeof ReopenJobRequestSchema>;
export interface ToggleFeaturedJobDto {
  userId: string;
  jobId: string;
}
export type UpdateCompanyJobPostingDto = z.infer<typeof UpdateCompanyJobPostingSchema>;
export type CompanyUpdateJobStatusRequestDto = z.infer<typeof CompanyUpdateJobStatusSchema>;
export type JobPostingFiltersDto = z.infer<typeof JobPostingFiltersSchema>;
export interface JobPostingFilters {
  status?: JobStatus;
  categoryIds?: string[];
  employmentTypes?: string[];
  salaryMin?: number;
  salaryMax?: number;
  companyId?: string;
  location?: string;
  search?: string;
  page?: number;
  limit?: number;
}
export interface PaginatedJobPostings<T = unknown> {
  jobs: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface AdminJobListItem {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salary: { min: number; max: number };
  status: string;
  applications: number;
  viewCount: number;
  createdAt: Date;
  employmentTypes: string[];
  categoryIds: string[];
  companyLogo?: string;
}
export interface AdminJobListResponseDto {
  jobs: AdminJobListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface AdminJobStatsResponseDto {
  total: number;
  active: number;
  inactive: number;
  totalApplications: number;
  totalViews: number;
}
export interface JobPostingResponseDto {
  id: string;
  company_id: string;
  company_name?: string;
  company_logo?: string;
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: { min: number; max: number };
  employment_types: EmploymentType[];
  location: string;
  skills_required: string[];
  category_ids: string[];
  status: JobStatus;
  is_featured: boolean;
  unpublish_reason?: string;
  view_count: number;
  application_count: number;
  enabled_stages?: string[];
  total_vacancies?: number;
  filled_vacancies?: number;
  closure_type?: string;
  closed_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface CompanyJobPostingListItemDto {
  id: string;
  title: string;
  status: JobStatus;
  employmentTypes: EmploymentType[];
  applicationCount: number;
  viewCount: number;
  isFeatured: boolean;
  unpublishReason?: string;
  createdAt: Date;
  enabled_stages?: string[];
  totalVacancies?: number;
  filledVacancies?: number;
}
export interface PublicJobListItemDto {
  id: string;
  title: string;
  viewCount: number;
  applicationCount: number;
  salary: { min: number; max: number };
  companyName: string;
  companyLogo?: string;
  isFeatured: boolean;
  createdAt: Date;
  location: string;
  description: string;
  skillsRequired: string[];
  employmentTypes: EmploymentType[];
}
export interface JobPostingDetailResponseDto {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: { min: number; max: number };
  employment_types: EmploymentType[];
  location: string;
  skills_required: string[];
  category_ids: string[];
  status: JobStatus;
  is_featured: boolean;
  unpublish_reason?: string;
  view_count: number;
  application_count: number;
  enabled_stages?: string[];
  total_vacancies?: number;
  filled_vacancies?: number;
  closure_type?: string;
  closed_at?: string;
  createdAt: string;
  updatedAt: string;
  has_applied?: boolean;
  company: {
    companyName: string;
    logo: string;
    organisation: string;
    employeeCount: number;
    websiteLink: string;
    workplacePictures: Array<{
      pictureUrl: string;
      caption?: string;
    }>;
  };
}
export interface GetCompanyJobPostingsResponseDto {
  jobs: CompanyJobPostingListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface PaginatedCompanyJobPostingsDto {
  jobs: CompanyJobPostingListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
