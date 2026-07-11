import { z } from 'zod';
import { EmploymentType } from 'src/domain/enums/employment-type.enum';
import { JobStatus } from 'src/domain/enums/job-status.enum';
import { CompanyJobPostingListItemDto } from 'src/application/dtos/admin/job.dto';

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

// requests/create-job-posting-request.dto.ts
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
export type CreateJobPostingRequestDto = z.infer<typeof CreateJobPostingRequestDtoSchema>;

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

// requests/increment-view.dto.ts
export const IncrementJobViewCountDto = z.object({
  id: z.string().min(1, 'Job ID is required'),
  userRole: z.string().optional(),
});
export type IncrementJobViewCountDto = z.infer<typeof IncrementJobViewCountDto>;

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

// requests/update-job-status.dto.ts
const JobStatusSchema = z.nativeEnum(JobStatus);
export const UpdateJobStatusDtoSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  status: JobStatusSchema,
  userId: z.string().optional(),
});
export type UpdateJobStatusDto = z.infer<typeof UpdateJobStatusDtoSchema>;

// responses/paginated-company-job-postings.dto.ts
export interface PaginatedCompanyJobPostingsDto {
  jobs: CompanyJobPostingListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
