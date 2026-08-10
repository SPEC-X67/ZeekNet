import { GetSeekerCompaniesSchema, GetFeaturedJobsRequestSchema, JobPostingFiltersSchema } from 'src/application/validations/public.validation';
import { z } from 'zod';
import { JobStatus } from 'src/domain/enums/job-status.enum';
import { EmploymentType } from 'src/domain/enums/employment-type.enum';
import { PublicJobListItemDto, CompanyJobPostingListItemDto } from './job-posting.dto';

export type GetSeekerCompaniesDto = z.infer<typeof GetSeekerCompaniesSchema>;
export type GetFeaturedJobsRequestDto = z.infer<typeof GetFeaturedJobsRequestSchema>;
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
export interface GetFeaturedJobsResponseDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface PaginatedPublicJobsDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface GetAllJobPostingsResponseDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
