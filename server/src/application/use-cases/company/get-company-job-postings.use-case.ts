import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { JobPostingQueryRequestDto } from '../../dto/job-posting/job-posting.dto';
import { AppError } from '../../../domain/errors/errors';
import { PaginatedJobPostings } from '../../../domain/entities/job-posting.entity';
import { TYPES } from '../../../infrastructure/di/types';

@injectable()
export class GetCompanyJobPostingsUseCase {
  constructor(@inject(TYPES.JobPostingRepository) private jobPostingRepository: JobPostingRepository) {}

  async execute(companyId: string, query: JobPostingQueryRequestDto): Promise<PaginatedJobPostings> {
    try {
      const filters = {
        is_active: query.is_active,
        category_ids: query.category_ids,
        employment_types: query.employment_types,
        salary_min: query.salary_min,
        salary_max: query.salary_max,
        search: query.search,
        page: query.page,
        limit: query.limit,
      };

      const result = await this.jobPostingRepository.findByCompanyId(companyId, filters);
      
      return {
        jobs: result.jobs,
        pagination: {
          page: query.page,
          limit: query.limit,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages,
        },
      };
    } catch (error) {
      throw new AppError('Failed to fetch job postings', 500);
    }
  }
}
