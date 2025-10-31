import { IJobPostingSearchRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { JobPostingQueryRequestDto } from '../../dto/job-posting/job-posting.dto';
import { AppError } from '../../../domain/errors/errors';
import { PaginatedJobPostings } from '../../../domain/entities/job-posting.entity';

export class GetCompanyJobPostingsUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingSearchRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(userId: string, query: JobPostingQueryRequestDto): Promise<PaginatedJobPostings> {
    try {
      const companyProfile = await this._companyProfileRepository.getProfileByUserId(userId);

      if (!companyProfile) {
        throw new AppError('Company profile not found', 404);
      }

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

      const result = await this._jobPostingRepository.findByCompanyId(companyProfile.id, filters);

      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to fetch job postings', 500);
    }
  }
}