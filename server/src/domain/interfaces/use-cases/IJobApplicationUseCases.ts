import type { ApplicationStage, InterviewSchedule, JobApplication } from '../../entities/job-application.entity';

export interface CreateJobApplicationData {
  job_id: string;
  cover_letter: string;
  resume_url: string;
  resume_filename: string;
}

export interface ICreateJobApplicationUseCase {
  execute(seekerId: string, companyId: string, data: CreateJobApplicationData): Promise<JobApplication>;
}

export interface IGetApplicationsByJobUseCase {
  execute(companyId: string, jobId: string, filters: { stage?: ApplicationStage; search?: string; page?: number; limit?: number }): Promise<{
    applications: JobApplication[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }>;
}

export interface IGetApplicationsBySeekerUseCase {
  execute(seekerId: string, filters: { stage?: ApplicationStage; page?: number; limit?: number }): Promise<{
    applications: JobApplication[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }>;
}

export interface IGetApplicationsByCompanyUseCase {
  execute(companyId: string, filters: { job_id?: string; stage?: ApplicationStage; search?: string; page?: number; limit?: number }): Promise<{
    applications: JobApplication[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }>;
}

export interface IGetApplicationDetailsUseCase {
  execute(applicationId: string): Promise<JobApplication>;
}

export interface IUpdateApplicationStageUseCase {
  execute(companyId: string, applicationId: string, stage: ApplicationStage, rejectionReason?: string): Promise<JobApplication>;
}

export interface IUpdateApplicationScoreUseCase {
  execute(companyId: string, applicationId: string, score: number): Promise<JobApplication>;
}

export interface IAddInterviewUseCase {
  execute(companyId: string, applicationId: string, interview: Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at' | 'feedback'>): Promise<JobApplication>;
}

export interface IUpdateInterviewUseCase {
  execute(companyId: string, applicationId: string, interviewId: string, interview: Partial<Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at' | 'feedback'>>): Promise<JobApplication>;
}

export interface IDeleteInterviewUseCase {
  execute(companyId: string, applicationId: string, interviewId: string): Promise<JobApplication>;
}

export interface IAddInterviewFeedbackUseCase {
  execute(companyId: string, applicationId: string, interviewId: string, feedback: { reviewer_name: string; rating?: number; comment: string }): Promise<JobApplication>;
}

export interface IDeleteJobApplicationUseCase {
  execute(seekerId: string, applicationId: string): Promise<boolean>;
}


