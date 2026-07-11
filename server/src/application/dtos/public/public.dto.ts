import { z } from 'zod';
import { JobStatus } from 'src/domain/enums/job-status.enum';
import { EmploymentType } from 'src/domain/enums/employment-type.enum';
import { PublicJobListItemDto } from 'src/application/dtos/admin/job.dto';

// requests/get-seeker-companies.dto.ts
export const GetSeekerCompaniesDtoSchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).optional().default('1'),
  limit: z.string().transform(val => parseInt(val, 10)).optional().default('10'),
  search: z.string().optional(),
  industry: z.string().optional(),
});
export type GetSeekerCompaniesDto = z.infer<typeof GetSeekerCompaniesDtoSchema>;

// listings/jobs/requests/get-featured-jobs-request.dto.ts
export const GetFeaturedJobsRequestSchema = z.object({
  page: z.preprocess((val) => (val ? Number(val) : 1), z.number().int().min(1)).default(1),
  limit: z.preprocess((val) => (val ? Number(val) : 12), z.number().int().min(1).max(100)).default(12),
});
export type GetFeaturedJobsRequestDto = z.infer<typeof GetFeaturedJobsRequestSchema>;

// listings/jobs/requests/job-posting-filters.dto.ts
const JobStatusSchema = z.nativeEnum(JobStatus);
export const JobPostingFiltersDtoSchema = z.object({
  status: JobStatusSchema.optional(),
  categoryIds: z.array(z.string()).optional(),
  employmentTypes: z.array(z.string()).optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  companyId: z.string().optional(),
  location: z.string().optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});
export type JobPostingFiltersDto = z.infer<typeof JobPostingFiltersDtoSchema>;

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

// listings/jobs/responses/job-posting-response.dto.ts
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

// listings/jobs/responses/get-featured-jobs-response.dto.ts
export interface GetFeaturedJobsResponseDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// listings/jobs/responses/paginated-public-jobs.dto.ts
export interface PaginatedPublicJobsDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// listings/jobs/responses/public-job-postings-response.dto.ts
export interface GetAllJobPostingsResponseDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
