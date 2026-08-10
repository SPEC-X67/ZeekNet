import { z } from 'zod';
import { EmploymentType } from 'src/domain/enums/employment-type.enum';
import { JobStatus } from 'src/domain/enums/job-status.enum';

export const EmploymentTypeSchema = z.nativeEnum(EmploymentType);
export const SalarySchema = z
  .object({
    min: z.number().min(0, 'Minimum salary must be positive'),
    max: z.number().min(0, 'Maximum salary must be positive'),
  })
  .refine((data) => data.max >= data.min, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['max'],
  });
export const CreateJobPostingRequestSchema = z.object({
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
export const GetJobPostingsQuerySchema = z.object({
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
export const JobPostingQuerySchema = GetJobPostingsQuerySchema;
export const GetAllJobsQuerySchema = z.object({
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
export const UpdateJobPostingRequestSchema = z.object({
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
export const UpdateJobPostingSchema = UpdateJobPostingRequestSchema;
export const UpdateJobStatusRequestSchema = z.object({
  status: z.nativeEnum(JobStatus),
  unpublish_reason: z.string().optional(),
});
export const JobStatusSchema = z.nativeEnum(JobStatus);
export const UpdateJobStatusSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  status: JobStatusSchema,
  userId: z.string().optional(),
});
export const IncrementJobViewCountSchema = z.object({
  id: z.string().min(1, 'Job ID is required'),
  userRole: z.string().optional(),
});
export const CloseJobSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});
export const DeleteCompanyJobPostingSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});
export const GetCompanyJobPostingSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});
export const ReopenJobSchema = z.object({
  additionalVacancies: z.number().int().min(1, 'additionalVacancies must be at least 1'),
});
export const ReopenJobRequestSchema = ReopenJobSchema.extend({
  jobId: z.string().min(1, 'Job ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});
export const UpdateCompanyJobPostingSchema = UpdateJobPostingRequestSchema.extend({
  jobId: z.string().min(1, 'Job ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});
export const CompanyUpdateJobStatusSchema = z.object({
  status: z.nativeEnum(JobStatus),
});
export const JobPostingFiltersSchema = z.object({
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
