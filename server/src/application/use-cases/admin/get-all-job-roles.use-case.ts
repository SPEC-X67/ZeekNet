import { IJobRoleRepository, JobRoleQueryFilters } from '../../../domain/interfaces/repositories/job-role/IJobRoleRepository';
import { PaginatedJobRoles, IGetAllJobRolesUseCase } from '../../../domain/interfaces/use-cases/IAdminUseCases';

export class GetAllJobRolesUseCase implements IGetAllJobRolesUseCase {
  constructor(private readonly _jobRoleRepository: IJobRoleRepository) {}

  async execute(options: { page?: number; limit?: number; search?: string }): Promise<PaginatedJobRoles> {
    const filters: JobRoleQueryFilters = {
      page: options.page,
      limit: options.limit,
      search: options.search,
      sortBy: 'name',
      sortOrder: 'asc',
    };

    return await this._jobRoleRepository.findAllWithPagination(filters);
  }
}

