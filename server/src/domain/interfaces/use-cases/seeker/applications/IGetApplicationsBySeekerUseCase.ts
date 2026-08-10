import { GetApplicationsBySeekerRequestDto, PaginatedApplicationsResponseDto } from 'src/application/dtos/job-application.dto';

export interface IGetApplicationsBySeekerUseCase {
  execute(data: GetApplicationsBySeekerRequestDto): Promise<PaginatedApplicationsResponseDto>;
}

