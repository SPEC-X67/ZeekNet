import { z } from 'zod';
import { JobStatus } from 'src/domain/enums/job-status.enum';
import { EmploymentType } from 'src/domain/enums/employment-type.enum';
import { PublicJobListItemDto, CompanyJobPostingListItemDto } from '../dtos/job-posting.dto';

export const GetSeekerCompaniesSchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).optional().default('1'),
  limit: z.string().transform(val => parseInt(val, 10)).optional().default('10'),
  search: z.string().optional(),
  industry: z.string().optional(),
});
export const GetFeaturedJobsRequestSchema = z.object({
  page: z.preprocess((val) => (val ? Number(val) : 1), z.number().int().min(1)).default(1),
  limit: z.preprocess((val) => (val ? Number(val) : 12), z.number().int().min(1).max(100)).default(12),
});
export const JobStatusSchema = z.nativeEnum(JobStatus);
export const JobPostingFiltersSchema = z.object({
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
