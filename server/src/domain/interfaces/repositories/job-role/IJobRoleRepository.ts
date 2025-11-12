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
  create(name: string): Promise<JobRole>;
  findById(id: string): Promise<JobRole | null>;
  findByName(name: string): Promise<JobRole | null>;
  findAll(filters: JobRoleQueryFilters): Promise<PaginatedJobRoles>;
  update(id: string, name: string): Promise<JobRole | null>;
  delete(id: string): Promise<boolean>;
}

