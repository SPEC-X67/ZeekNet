export interface JobPostingResponseDto {
  id: string;
  title: string;
  salary: {
    min: number;
    max: number;
  };
  employment_types: string[];
  location: string;
  skills_required: string[];
  category_ids: string[];
  createdAt: string;
  is_active: boolean;
  application_count: number;
  view_count: number;
  company: {
    companyName: string;
    logo: string;
  };
}

export interface PaginatedJobPostingsResponse {
  jobs: JobPostingResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface JobPostingDetailResponseDto {
  id: string;
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
  company: {
    companyName: string;
    logo: string;
    workplacePictures: Array<{
      pictureUrl: string;
      caption?: string;
    }>;
  };
}

