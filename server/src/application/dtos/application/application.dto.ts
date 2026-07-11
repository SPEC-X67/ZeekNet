import { z } from 'zod';
import { ATSStage, ATSSubStage } from 'src/domain/enums/ats-stage.enum';
import { ATS_SUB_STAGE_VALUES } from 'src/domain/utils/ats-sub-stage-values';

// requests/get-job-applications-kanban.dto.ts
export const GetJobApplicationsKanbanDtoSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
});
export type GetJobApplicationsKanbanDto = z.infer<typeof GetJobApplicationsKanbanDtoSchema>;

// requests/get-job-pipeline.dto.ts
export const GetJobPipelineDtoSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
});
export type GetJobPipelineDto = z.infer<typeof GetJobPipelineDtoSchema>;

// requests/move-application-stage.dto.ts
export const MoveApplicationStageDtoSchema = z.object({
  nextStage: z.nativeEnum(ATSStage, {
    errorMap: () => ({ message: 'Invalid stage' }),
  }),
  subStage: z.enum(ATS_SUB_STAGE_VALUES as [string, ...string[]]).optional(),
  comment: z.string().optional(),
});
export type MoveApplicationStageDto = z.infer<typeof MoveApplicationStageDtoSchema> & {
  applicationId: string;
  userId: string;
  userName: string;
};

// requests/update-application-stage.dto.ts
const ATSStageSchema = z.nativeEnum(ATSStage);
export const UpdateApplicationStageDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  applicationId: z.string().min(1, 'Application ID is required'),
  stage: ATSStageSchema,
  subStage: z.string().optional(),
  rejectionReason: z.string().optional(),
});
export const UpdateApplicationStageDto = UpdateApplicationStageDtoSchema;
export type UpdateApplicationStageDto = z.infer<typeof UpdateApplicationStageDtoSchema>;

export const UpdateApplicationStageRequestDtoSchema = z.object({
  stage: ATSStageSchema,
  subStage: z.string().optional(),
  rejectionReason: z.string().optional(),
});

// requests/update-score.dto.ts
export const UpdateScoreDto = z.object({
  userId: z.string().optional(),
  applicationId: z.string().min(1, 'Application ID is required'),
  score: z.number().min(0, 'Score must be at least 0').max(5, 'Score must be at most 5'),
});
export type UpdateScoreRequestDto = z.infer<typeof UpdateScoreDto>;

// requests/update-sub-stage.dto.ts
export const UpdateSubStageDtoSchema = z.object({
  subStage: z.enum(ATS_SUB_STAGE_VALUES as [string, ...string[]], {
    errorMap: () => ({ message: 'Invalid sub-stage' }),
  }),
  comment: z.string().optional(),
});
export type UpdateSubStageDto = z.infer<typeof UpdateSubStageDtoSchema> & {
  applicationId: string;
  userId: string;
  userName: string;
};

// responses/job-application-response.dto.ts
export interface JobApplicationResponseDto {
  id: string;
  seekerId: string;
  jobId: string;
  companyId: string;
  coverLetter: string;
  resumeUrl: string;
  resumeFilename: string;
  stage: ATSStage;
  subStage: ATSSubStage;
  score?: number;
  atsScore?: number;
  appliedDate: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
