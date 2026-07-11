import { PublicJobListItemDto } from 'src/application/dtos/admin/job.dto';
import { GetFeaturedJobsResponseDto } from 'src/application/dtos/public/public.dto';;

export class GetFeaturedJobsMapper {
  static toResponse(
    jobs: PublicJobListItemDto[],
    pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        },
  ): GetFeaturedJobsResponseDto {
    return {
      jobs,
      pagination,
    };
  }
}
