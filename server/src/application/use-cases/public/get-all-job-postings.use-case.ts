import { IJobPostingSearchRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { IGetAllJobPostingsUseCase } from '../../../domain/interfaces/use-cases/IPublicUseCases';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingFilters, PaginatedJobPostings } from '../../../domain/entities/job-posting.entity';

export class GetAllJobPostingsUseCase implements IGetAllJobPostingsUseCase {
  constructor(private readonly _jobPostingSearchRepository: IJobPostingSearchRepository) {}

  async execute(query: JobPostingFilters): Promise<PaginatedJobPostings> {
    try {
      
      const filters = {
        ...query,
        is_active: query.is_active ?? true,
      };
      
      const result = await this._jobPostingSearchRepository.findAll(filters);
      return result;
    } catch (error) {
      throw new AppError('Failed to fetch job postings', 500);
    }
  }
}

