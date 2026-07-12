import { z } from 'zod';
import { ATSStage, ATSSubStage } from 'src/domain/enums/ats-stage.enum';
import { ATS_SUB_STAGE_VALUES } from 'src/domain/utils/ats-sub-stage-values';

export const CreateJobApplicationSchema = z.object({
  job_id: z.string().min(1, 'Job ID is required'),
  cover_letter: z
    .string()
    .min(50, 'Cover letter must be at least 50 characters')
    .max(5000, 'Cover letter must not exceed 5000 characters'),
  resume_url: z.string().min(1, 'Resume URL is required'),
  resume_filename: z.string().min(1, 'Resume filename is required'),
});
export const GetApplicationsBySeekerSchema = z.object({
  seekerId: z.string().optional(),
  stage: z.enum(['applied', 'in_review', 'shortlisted', 'interview', 'technical_task', 'compensation', 'offer', 'rejected', 'hired']).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
export const GetJobApplicationsKanbanSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
});
export const GetJobPipelineSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
});
export const MoveApplicationStageSchema = z.object({
  nextStage: z.nativeEnum(ATSStage, {
    errorMap: () => ({ message: 'Invalid stage' }),
  }),
  subStage: z.enum(ATS_SUB_STAGE_VALUES as [string, ...string[]]).optional(),
  comment: z.string().optional(),
});
export const ATSStageSchema = z.nativeEnum(ATSStage);
export const UpdateApplicationStageSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  applicationId: z.string().min(1, 'Application ID is required'),
  stage: ATSStageSchema,
  subStage: z.string().optional(),
  rejectionReason: z.string().optional(),
});
export const UpdateApplicationStageRequestSchema = z.object({
  stage: ATSStageSchema,
  subStage: z.string().optional(),
  rejectionReason: z.string().optional(),
});
export const UpdateScoreSchema = z.object({
  userId: z.string().optional(),
  applicationId: z.string().min(1, 'Application ID is required'),
  score: z.number().min(0, 'Score must be at least 0').max(5, 'Score must be at most 5'),
});
export const UpdateSubStageSchema = z.object({
  subStage: z.enum(ATS_SUB_STAGE_VALUES as [string, ...string[]], {
    errorMap: () => ({ message: 'Invalid sub-stage' }),
  }),
  comment: z.string().optional(),
});
