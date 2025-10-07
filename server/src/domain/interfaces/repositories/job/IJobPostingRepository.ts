import { JobPosting, PaginatedJobPostings, JobPostingFilters } from '../../../entities/job-posting.entity';

export interface JobStats {
  totalJobs: number;
  activeJobs: number;
  inactiveJobs: number;
  totalViews: number;
  totalApplications: number;
}

export interface IJobPostingRepository {
  create(data: unknown): Promise<JobPosting>;
  findById(id: string): Promise<JobPosting | null>;
  update(id: string, data: unknown): Promise<JobPosting | null>;
  delete(id: string): Promise<boolean>;
}

export interface IJobPostingSearchRepository {
  findAll(filters: JobPostingFilters): Promise<PaginatedJobPostings>;
  findByCompanyId(companyId: string, filters: JobPostingFilters): Promise<PaginatedJobPostings>;
}

export interface IJobPostingAnalyticsRepository {
  getJobStats(): Promise<JobStats>;
  getJobStatsByCompany(companyId: string): Promise<JobStats>;
  incrementViewCount(id: string): Promise<void>;
}

export interface IJobPostingManagementRepository extends IJobPostingRepository {
  updateJobStatus(jobId: string, status: 'active' | 'inactive'): Promise<JobPosting | null>;
  incrementViewCount(jobId: string): Promise<void>;
  incrementApplicationCount(jobId: string): Promise<void>;
}

