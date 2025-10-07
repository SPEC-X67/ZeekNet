import { IJobPostingSearchRepository } from '../../../domain/interfaces/repositories';
import { IAdminGetAllJobsUseCase } from '../../../domain/interfaces/use-cases';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';

export interface GetAllJobsQuery {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  category_ids?: string[];
  employment_types?: string[];
  salary_min?: number;
  salary_max?: number;
  location?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class AdminGetAllJobsUseCase implements IAdminGetAllJobsUseCase {
  constructor(
    private readonly _jobPostingSearchRepository: IJobPostingSearchRepository,
  ) {}

  async execute(query: GetAllJobsQuery) {
    try {
      const filters = {
        is_active: query.is_active,
        category_ids: query.category_ids,
        employment_types: query.employment_types,
        salary_min: query.salary_min,
        salary_max: query.salary_max,
        search: query.search,
        page: query.page || 1,
        limit: query.limit || 10,
        sortBy: query.sortBy || 'createdAt',
        sortOrder: query.sortOrder || 'desc',
      };

      const result = await this._jobPostingSearchRepository.findAll(filters);
      
      return result;
    } catch (error) {
      throw new AppError('Failed to fetch jobs', 500);
    }
  }
}
