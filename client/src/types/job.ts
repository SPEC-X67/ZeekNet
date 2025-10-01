export interface JobPostingResponse {
  id: string;
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
  is_active: boolean;
  view_count: number;
  application_count: number;
  createdAt: string;
  updatedAt: string;
  company?: {
    companyName: string;
    logo?: string;
    workplacePictures?: {
      pictureUrl: string;
      caption?: string;
    }[];
  };
}

export interface JobPostingQuery {
  page?: number;
  limit?: number;
  category_ids?: string[];
  employment_types?: string[];
  salary_min?: number;
  salary_max?: number;
  location?: string;
  search?: string;
  is_active?: boolean; // For company API
}

export interface PaginatedJobPostings {
  jobs: JobPostingResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
