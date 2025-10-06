import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { JobPostingQueryRequestDto } from '../../dto/job-posting/job-posting.dto';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';

@injectable()
export class GetCompanyJobPostingsUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository,
    @inject(TYPES.CompanyRepository)
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string, query: JobPostingQueryRequestDto): Promise<any> {
    try {
      const companyProfile = await this.companyRepository.getProfileByUserId(userId);
      
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

      const result = await this.jobPostingRepository.findByCompanyId(companyProfile.id, filters);
      
      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to fetch job postings', 500);
    }
  }
}
