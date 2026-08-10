import { PublicJobListItemDto } from 'src/application/dtos/job-posting.dto';
import { GetFeaturedJobsResponseDto } from 'src/application/dtos/public.dto';;

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
