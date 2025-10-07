import { JobPosting, CreateJobPostingRequest, UpdateJobPostingRequest, JobPostingFilters, PaginatedJobPostings } from '../../entities/job-posting.entity';

export interface IJobPostingRepository {
  create(data: CreateJobPostingRequest): Promise<JobPosting>;
  findById(id: string): Promise<JobPosting | null>;
  findByIdForClient(id: string): Promise<any>;
  update(id: string, data: UpdateJobPostingRequest): Promise<JobPosting | null>;
  delete(id: string): Promise<boolean>;
}

export interface IJobPostingSearchRepository {
  findByCompanyId(companyId: string, filters?: JobPostingFilters): Promise<PaginatedJobPostings>;
  findAll(filters?: JobPostingFilters): Promise<PaginatedJobPostings>;
}

export interface IJobPostingAnalyticsRepository {
  incrementViewCount(id: string): Promise<void>;
  incrementApplicationCount(id: string): Promise<void>;
}

export interface IJobPostingManagementRepository {
  updateJobStatus(id: string, status: string): Promise<JobPosting | null>;
}

// Removed IJobPostingRepositoryFull - use specific interfaces instead
