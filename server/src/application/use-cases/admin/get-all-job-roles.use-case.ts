import { IJobRoleRepository, JobRoleQueryFilters, PaginatedJobRoles } from '../../../domain/interfaces/repositories/job-role/IJobRoleRepository';
import { IGetAllJobRolesUseCase } from '../../../domain/interfaces/use-cases/IAdminUseCases';

export class GetAllJobRolesUseCase implements IGetAllJobRolesUseCase {
  constructor(private readonly _jobRoleRepository: IJobRoleRepository) {}

  async execute(filters: JobRoleQueryFilters): Promise<PaginatedJobRoles> {
    return await this._jobRoleRepository.findAll(filters);
  }
}

