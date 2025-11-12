import { JobRole } from '../../../entities/job-role.entity';

export interface JobRoleQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedJobRoles {
  jobRoles: JobRole[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IJobRoleRepository {
  findById(id: string): Promise<JobRole | null>;
  findByName(name: string): Promise<JobRole | null>;
  create(data: { name: string }): Promise<JobRole>;
  update(id: string, updates: { name: string }): Promise<JobRole | null>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
  findAllWithPagination(filters?: JobRoleQueryFilters): Promise<PaginatedJobRoles>;
}

