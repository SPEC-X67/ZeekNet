import { GetAllJobPostingsResponseDto } from 'src/application/dtos/public.dto';;
import { JobPostingFilters } from 'src/application/dtos/public.dto';

export interface IGetAllJobPostingsUseCase {
  execute(query: JobPostingFilters): Promise<GetAllJobPostingsResponseDto>;
}

