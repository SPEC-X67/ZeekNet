import { CompanyJobPostingListItemDto } from 'src/application/dtos/admin/job/job.dto';

export interface PaginatedCompanyJobPostingsDto {
  jobs: CompanyJobPostingListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
