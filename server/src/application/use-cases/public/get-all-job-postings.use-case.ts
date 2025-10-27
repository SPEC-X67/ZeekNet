import { IJobPostingSearchRepository } from '../../../domain/interfaces/repositories';
import { IGetAllJobPostingsUseCase } from '../../../domain/interfaces/use-cases';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingFilters, PaginatedJobPostings } from '../../../domain/entities/job-posting.entity';

export class GetAllJobPostingsUseCase implements IGetAllJobPostingsUseCase {
  constructor(private readonly _jobPostingSearchRepository: IJobPostingSearchRepository) {}

  async execute(query: JobPostingFilters): Promise<PaginatedJobPostings> {
    try {
      const result = await this._jobPostingSearchRepository.findAll(query);
      return result;
    } catch (error) {
      throw new AppError('Failed to fetch job postings', 500);
    }
  }
}
