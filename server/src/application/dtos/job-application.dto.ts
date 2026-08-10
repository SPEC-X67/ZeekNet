import { CreateJobApplicationSchema, GetApplicationsBySeekerSchema, GetJobApplicationsKanbanSchema, GetJobPipelineSchema, MoveApplicationStageSchema, UpdateApplicationStageSchema, UpdateApplicationStageRequestSchema, UpdateScoreSchema, UpdateSubStageSchema } from 'src/application/validations/job-application.validation';
import { z } from 'zod';
import { ATSStage, ATSSubStage } from 'src/domain/enums/ats-stage.enum';
import { ATS_SUB_STAGE_VALUES } from 'src/domain/utils/ats-sub-stage-values';

export type CreateJobApplicationRequestDto = z.infer<typeof CreateJobApplicationSchema>;
export type GetApplicationsBySeekerRequestDto = z.infer<typeof GetApplicationsBySeekerSchema>;
export type GetJobApplicationsKanbanDto = z.infer<typeof GetJobApplicationsKanbanSchema>;
export type GetJobPipelineDto = z.infer<typeof GetJobPipelineSchema>;
export type MoveApplicationStageDto = z.infer<typeof MoveApplicationStageSchema> & {
  applicationId: string;
  userId: string;
  userName: string;
};
export type UpdateApplicationStageDto = z.infer<typeof UpdateApplicationStageSchema>;
export type UpdateScoreRequestDto = z.infer<typeof UpdateScoreSchema>;
export type UpdateSubStageDto = z.infer<typeof UpdateSubStageSchema> & {
  applicationId: string;
  userId: string;
  userName: string;
};
export interface InterviewScheduleResponseDto {
  id: string;
  date: string;
  time: string;
  interview_type: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  feedback?: {
    reviewer_name: string;
    rating?: number;
    comment: string;
    reviewed_at: string;
  };
  created_at?: string;
  updated_at?: string;
}
export interface JobApplicationListResponseDto {
  id: string;
  seeker_id?: string;
  seeker_name?: string;
  seeker_avatar?: string;
  job_id: string;
  job_title: string;
  company_name?: string;
  company_logo?: string;
  score?: number;
  stage: 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
  sub_stage?: string;
  applied_date: string;
  is_blocked?: boolean;
}
export interface JobApplicationDetailResponseDto {
  id: string;
  seeker_id: string;
  seeker_name: string;
  seeker_avatar?: string;
  seeker_headline?: string;
  job_id: string;
  job_title: string;
  job_company?: string;
  job_location?: string;
  job_type?: string;
  company_name?: string;
  company_logo?: string;
  cover_letter: string;
  resume_url: string;
  resume_filename: string;
  score?: number;
  stage: 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
  sub_stage?: string;
  applied_date: string;
  rejection_reason?: string;
  interviews: InterviewScheduleResponseDto[];
  full_name?: string;
  date_of_birth?: Date;
  gender?: string;
  languages?: string[];
  address?: string;
  about_me?: string;
  current_job?: string;
  highest_qualification?: string;
  experience_years?: number;
  skills?: string[];
  email?: string;
  phone?: string;
  resume_data?: {
    experience?: Array<{
      title: string;
      company: string;
      period: string;
      location?: string;
      description?: string;
    }>;
    education?: Array<{
      degree: string;
      school: string;
      period: string;
      location?: string;
    }>;
    tools_technologies?: string[];
    other_skills?: string[];
  };
  is_blocked?: boolean;
}
export interface PaginatedApplicationsResponseDto {
  applications: JobApplicationListResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
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
export interface JobApplicationKanbanItem {
  id: string;
  seekerId: string;
  seekerName?: string;
  seekerAvatar?: string;
  jobTitle?: string;
  atsScore?: number;
  subStage: string;
  appliedDate: Date;
}
export interface JobApplicationsKanbanResponseDto {
  [stage: string]: JobApplicationKanbanItem[];
}
export interface JobATSPipelineResponseDto {
  jobId: string;
  enabledStages: string[];
  pipelineConfig: Record<string, string[]>;
}
