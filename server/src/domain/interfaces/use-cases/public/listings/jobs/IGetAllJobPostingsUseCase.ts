import { GetAllJobPostingsResponseDto } from 'src/application/dtos/public/public.dto';;
import { JobPostingFilters } from 'src/application/dtos/admin/job.dto';

export interface IGetAllJobPostingsUseCase {
  execute(query: JobPostingFilters): Promise<GetAllJobPostingsResponseDto>;
}

