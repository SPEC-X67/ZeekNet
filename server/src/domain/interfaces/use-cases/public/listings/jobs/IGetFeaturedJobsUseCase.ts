import { GetFeaturedJobsRequestDto, GetFeaturedJobsResponseDto } from 'src/application/dtos/public.dto';;
;

export interface IGetFeaturedJobsUseCase {
    execute(dto: GetFeaturedJobsRequestDto): Promise<GetFeaturedJobsResponseDto>;
}
