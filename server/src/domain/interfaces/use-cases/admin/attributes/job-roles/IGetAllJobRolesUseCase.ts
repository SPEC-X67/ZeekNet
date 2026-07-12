import { GetAllJobRolesRequestDto, PaginatedJobRolesResultDto } from 'src/application/dtos/job-role.dto';

export interface IGetAllJobRolesUseCase {
  execute(options: GetAllJobRolesRequestDto): Promise<PaginatedJobRolesResultDto>;
}

