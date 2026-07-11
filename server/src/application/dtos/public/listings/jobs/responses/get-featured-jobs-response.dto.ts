import { PublicJobListItemDto } from 'src/application/dtos/admin/job.dto';

export interface GetFeaturedJobsResponseDto {
    jobs: PublicJobListItemDto[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
