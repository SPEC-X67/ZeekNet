import { CompanyJobPostingListItemDto } from 'src/application/dtos/admin/job.dto';

export interface GetCompanyJobPostingsResponseDto {
  jobs: CompanyJobPostingListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
