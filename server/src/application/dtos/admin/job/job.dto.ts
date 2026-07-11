import { z } from 'zod';
import { EmploymentType } from 'src/domain/enums/employment-type.enum';
import { JobStatus } from 'src/domain/enums/job-status.enum';

// requests/create-job-posting-request.dto.ts
const EmploymentTypeSchema = z.nativeEnum(EmploymentType);

const SalarySchema = z
  .object({
    min: z.number().min(0, 'Minimum salary must be positive'),
    max: z.number().min(0, 'Maximum salary must be positive'),
  })
  .refine((data) => data.max >= data.min, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['max'],
  });

export const CreateJobPostingRequestDtoSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title must not exceed 100 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters').max(2000, 'Description must not exceed 2000 characters'),
  responsibilities: z.array(z.string().min(5, 'Each responsibility must be at least 5 characters')).min(1, 'At least one responsibility is required'),
  qualifications: z.array(z.string().min(5, 'Each qualification must be at least 5 characters')).min(1, 'At least one qualification is required'),
  nice_to_haves: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  salary: SalarySchema,
  employment_types: z.array(EmploymentTypeSchema).min(1, 'At least one employment type is required'),
  location: z.string().min(2, 'Location must be at least 2 characters').max(100, 'Location must not exceed 100 characters'),
  skills_required: z.array(z.string()).default([]),
  category_ids: z.array(z.string().min(1, 'Category ID is required')).min(1, 'At least one category is required'),
  enabled_stages: z.array(z.string()).optional(),
  is_featured: z.boolean().optional().default(false),
  total_vacancies: z.number().int().min(1, 'Total vacancies must be at least 1').optional().default(1),
});
export type CreateJobPostingRequestDto = z.infer<typeof CreateJobPostingRequestDtoSchema> & {
  userId?: string;
};

// requests/get-all-jobs-query.dto.ts
export const GetAllJobsQueryDto = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  status: z.nativeEnum(JobStatus).optional(),
  category_ids: z.array(z.string()).optional(),
  employment_types: z.array(z.string()).optional(),
  salary_min: z.coerce.number().optional(),
  salary_max: z.coerce.number().optional(),
  location: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
export type GetAllJobsQueryDtoType = z.infer<typeof GetAllJobsQueryDto>;
export type GetAllJobsQueryRequestDto = z.infer<typeof GetAllJobsQueryDto>;

// requests/get-job-postings-query.dto.ts
export const GetJobPostingsQueryDtoSchema = z.object({
  userId: z.string().optional(),
  is_active: z.coerce.boolean().optional(),
  category_ids: z
    .string()
    .transform((val) => val.split(','))
    .optional(),
  employment_types: z
    .string()
    .transform((val) => val.split(',') as ('full-time' | 'part-time' | 'contract' | 'internship' | 'remote')[])
    .optional(),
  salary_min: z.coerce.number().min(0).optional(),
  salary_max: z.coerce.number().min(0).optional(),
  company_id: z.string().optional(),
  location: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
export type GetJobPostingsQueryDto = z.infer<typeof GetJobPostingsQueryDtoSchema>;
export const JobPostingQueryDto = GetJobPostingsQueryDtoSchema;
export type JobPostingQueryRequestDto = GetJobPostingsQueryDto;

// requests/job-posting-filters.dto.ts
export const JobPostingFiltersDtoSchema = z.object({
  status: z.nativeEnum(JobStatus).optional(),
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

// requests/update-job-posting-request.dto.ts
export const UpdateJobPostingRequestDtoSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title must not exceed 100 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description must not exceed 2000 characters').optional(),
  responsibilities: z.array(z.string().min(10, 'Each responsibility must be at least 10 characters')).optional(),
  qualifications: z.array(z.string().min(10, 'Each qualification must be at least 10 characters')).optional(),
  nice_to_haves: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salary: SalarySchema.optional(),
  employment_types: z.array(EmploymentTypeSchema).optional(),
  location: z.string().min(2, 'Location must be at least 2 characters').max(100, 'Location must not exceed 100 characters').optional(),
  skills_required: z.array(z.string()).optional(),
  category_ids: z.array(z.string().min(1, 'Category ID is required')).optional(),
  enabled_stages: z.array(z.string()).optional(),
  is_active: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  total_vacancies: z.number().int().min(1, 'Total vacancies must be at least 1').optional(),
});
export type UpdateJobPostingRequestDto = z.infer<typeof UpdateJobPostingRequestDtoSchema>;
export const UpdateJobPostingDto = UpdateJobPostingRequestDtoSchema;

// requests/update-job-status-request.dto.ts
export const UpdateJobStatusRequestDtoSchema = z.object({
  status: z.nativeEnum(JobStatus),
  unpublish_reason: z.string().optional(),
});
export type UpdateJobStatusRequestDto = z.infer<typeof UpdateJobStatusRequestDtoSchema>;

// responses/admin-job-response.dto.ts
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

// responses/job-posting-response.dto.ts
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
