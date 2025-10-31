import { JobPosting, PaginatedJobPostings, JobPostingFilters } from '../../../entities/job-posting.entity';

export interface JobStats {
  totalJobs: number;
  activeJobs: number;
  inactiveJobs: number;
  totalViews: number;
  totalApplications: number;
}

export interface JobPostingDetailResponseDto {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: { min: number; max: number };
  employment_types: string[];
  location: string;
  skills_required: string[];
  category_ids: string[];
  is_active: boolean;
  admin_blocked?: boolean;
  unpublish_reason?: string;
  view_count: number;
  application_count: number;
  createdAt: string;
  updatedAt: string;
  company: {
    companyName: string;
    logo: string;
    workplacePictures: Array<{
      pictureUrl: string;
      caption?: string;
    }>;
  };
}

export interface IJobPostingRepository {
  create(data: unknown): Promise<JobPosting>;
  findById(id: string): Promise<JobPosting | null>;
  findByIdForClient(id: string): Promise<JobPostingDetailResponseDto | null>;
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