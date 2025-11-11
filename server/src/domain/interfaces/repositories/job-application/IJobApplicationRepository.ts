import type { JobApplication, InterviewSchedule, ApplicationStage } from '../../../entities/job-application.entity';

export interface ApplicationFilters {
  job_id?: string;
  seeker_id?: string;
  company_id?: string;
  stage?: ApplicationStage;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedApplications {
  applications: JobApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IJobApplicationRepository {
  create(data: {
    seeker_id: string;
    job_id: string;
    company_id: string;
    cover_letter: string;
    resume_url: string;
    resume_filename: string;
  }): Promise<JobApplication>;

  findById(id: string): Promise<JobApplication | null>;

  findByJobId(jobId: string, filters: Omit<ApplicationFilters, 'job_id' | 'company_id' | 'seeker_id'>): Promise<PaginatedApplications>;

  findBySeekerId(seekerId: string, filters: Omit<ApplicationFilters, 'seeker_id' | 'company_id' | 'job_id'>): Promise<PaginatedApplications>;

  findByCompanyId(companyId: string, filters: Omit<ApplicationFilters, 'company_id' | 'seeker_id' | 'job_id'>): Promise<PaginatedApplications>;

  update(id: string, data: Partial<Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>>): Promise<JobApplication | null>;

  updateStage(id: string, stage: ApplicationStage, rejectionReason?: string): Promise<JobApplication | null>;

  updateScore(id: string, score: number): Promise<JobApplication | null>;

  addInterview(applicationId: string, interview: Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>): Promise<JobApplication | null>;

  updateInterview(applicationId: string, interviewId: string, interview: Partial<Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>>): Promise<JobApplication | null>;

  deleteInterview(applicationId: string, interviewId: string): Promise<JobApplication | null>;

  addInterviewFeedback(applicationId: string, interviewId: string, feedback: { reviewer_name: string; rating?: number; comment: string; reviewed_at: Date }): Promise<JobApplication | null>;

  delete(id: string): Promise<boolean>;

  checkDuplicateApplication(seekerId: string, jobId: string): Promise<boolean>;
}


