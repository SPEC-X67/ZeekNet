import { z } from 'zod';
import { ATSStage, ATSSubStage } from 'src/domain/enums/ats-stage.enum';

export const ApplicationFiltersSchema = z.object({
  userId: z.string().min(1, 'User ID is required').optional(),
  job_id: z.string().optional(),
  stage: z.enum(['applied', 'in_review', 'shortlisted', 'interview', 'technical_task', 'compensation', 'offer', 'rejected', 'hired']).optional(),
  search: z.string().optional(),
  min_score: z.coerce.number().int().min(0).max(100).optional(),
  max_score: z.coerce.number().int().min(0).max(100).optional(),
  sort_by: z.enum(['applied_date', 'score']).optional().default('applied_date'),
  sort_order: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
export const BulkUpdateApplicationsSchema = z.object({
  application_ids: z.array(z.string().min(1, 'Application ID is required')).min(1, 'At least one application ID is required'),
  stage: z.nativeEnum(ATSStage, {
    errorMap: () => ({ message: 'Invalid stage' }),
  }),
});
export const GetApplicationDetailsSchema = z.object({
  userId: z.string().min(1, 'User ID is required').optional(),
  seekerId: z.string().min(1, 'Seeker ID is required').optional(),
  applicationId: z.string().min(1, 'Application ID is required'),
}).refine(data => data.userId || data.seekerId, {
  message: 'Either userId or seekerId must be provided',
});
export const GetApplicationsByJobSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  jobId: z.string().min(1, 'Job ID is required'),
  stage: z.enum(['applied', 'in_review', 'shortlisted', 'interview', 'technical_task', 'compensation', 'offer', 'rejected', 'hired']).optional(),
  search: z.string().optional(),
  min_score: z.coerce.number().int().min(0).max(100).optional(),
  max_score: z.coerce.number().int().min(0).max(100).optional(),
  sort_by: z.enum(['applied_date', 'score']).optional().default('applied_date'),
  sort_order: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
export const GetCandidateDetailsSchema = z.object({
  id: z.string().min(1, 'Candidate ID is required'),
});
export const GetCandidatesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  location: z.string().optional(),
  skills: z.string().transform((val) => val.split(',')).optional(),
});
export const UpdateApplicationScoreSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  applicationId: z.string().min(1, 'Application ID is required'),
  score: z.number().min(0, 'Score must be non-negative').max(100, 'Score must not exceed 100'),
});
