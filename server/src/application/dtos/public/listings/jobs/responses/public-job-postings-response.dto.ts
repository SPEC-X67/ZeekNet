import { PublicJobListItemDto } from 'src/application/dtos/admin/job.dto';

export interface GetAllJobPostingsResponseDto {
  jobs: PublicJobListItemDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
