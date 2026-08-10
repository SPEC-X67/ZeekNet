import { ToggleFeaturedJobDto } from 'src/application/dtos/job-posting.dto';
import { JobPostingResponseDto } from 'src/application/dtos/public.dto';

export interface IToggleFeaturedJobUseCase {
    execute(data: ToggleFeaturedJobDto): Promise<JobPostingResponseDto>;
}
