import { GetAllJobRolesRequestDto, PaginatedJobRolesResultDto } from 'src/application/dtos/admin/attributes/job-roles/job-role.dto';

export interface IGetAllJobRolesUseCase {
  execute(options: GetAllJobRolesRequestDto): Promise<PaginatedJobRolesResultDto>;
}

