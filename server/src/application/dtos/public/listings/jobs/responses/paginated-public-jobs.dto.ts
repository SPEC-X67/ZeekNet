import { PublicJobListItemDto } from 'src/application/dtos/admin/job/job.dto';

export interface PaginatedPublicJobsDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
