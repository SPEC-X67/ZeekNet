import { GetAllJobRolesRequestDto, PaginatedJobRolesResultDto } from 'src/application/dtos/admin/job-role.dto';

export interface IGetAllJobRolesUseCase {
  execute(options: GetAllJobRolesRequestDto): Promise<PaginatedJobRolesResultDto>;
}

