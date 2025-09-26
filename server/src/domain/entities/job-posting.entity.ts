export interface JobPosting {
  _id: string;
  company_id: string; // Reference to company_profiles
  
  title: string;
  description: string;
  responsibilities: string[]; // Array of strings
  qualifications: string[]; // Array of strings (Who You Are)
  nice_to_haves: string[]; // Array of strings
  benefits: string[]; // Array of strings
  
  salary: {
    min: number;
    max: number;
  };
  
  employment_types: string[]; // ["full-time", "part-time", "contract", "internship", "remote"]
  location: string;
  skills_required: string[]; // Array of skill ObjectIds
  category_ids: string[]; // Array of category ObjectIds
  
  is_active: boolean;
  view_count: number;
  application_count: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PAUSED = 'paused',
  CLOSED = 'closed',
  EXPIRED = 'expired'
}

export interface CreateJobPostingRequest {
  company_id: string;
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: {
    min: number;
    max: number;
  };
  employment_types: string[];
  location: string;
  skills_required: string[];
  category_ids: string[];
}

export interface UpdateJobPostingRequest extends Partial<CreateJobPostingRequest> {
  is_active?: boolean;
}

export interface JobPostingFilters {
  is_active?: boolean;
  category_ids?: string[];
  employment_types?: string[];
  salary_min?: number;
  salary_max?: number;
  company_id?: string;
  location?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedJobPostings {
  jobs: JobPosting[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
